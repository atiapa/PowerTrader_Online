# PowerTrader POS - Deployment Guide

## System Requirements

### Server Requirements
- **Operating System**: Windows Server 2019+ or Linux (Ubuntu 20.04+)
- **CPU**: 4+ cores recommended
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 100GB+ SSD recommended
- **Network**: Stable internet connection for cloud deployment

### Software Requirements
- **.NET Runtime**: 8.0 or higher
- **SQL Server**: 2019 or higher
- **Node.js**: 20.x LTS
- **Web Server**: IIS 10+ (Windows) or Nginx (Linux)

## Database Setup

### 1. Database Connection
The system connects to an existing SQL Server database:
```
Server: 108.60.219.173,1981
Database: POS
User ID: sa
Password: TMT@2024
```

### 2. Verify Database Tables
Ensure all required tables exist in the database. The system expects 100+ tables including:
- Accounts_Creation
- Sales_Details
- Products (or Products_tbl)
- Staff_Information (or systemuserpro)
- All other tables as specified in the requirements

### 3. Initial Data Seeding
If using the built-in models, the system will seed:
- Default tenant (DEMO)
- Default users for each role with PIN: 1234
- Sample products

## Backend Deployment

### Development Environment
```bash
cd PowerTraderPOS.API
dotnet restore
dotnet run --urls "http://localhost:5000"
```

### Production Deployment (Windows/IIS)
1. Publish the application:
```bash
cd PowerTraderPOS.API
dotnet publish -c Release -o ./publish
```

2. Create IIS Application Pool:
   - .NET CLR Version: No Managed Code
   - Pipeline Mode: Integrated

3. Create IIS Website:
   - Physical Path: Point to publish folder
   - Binding: HTTP/HTTPS with appropriate port

4. Configure `web.config` if needed:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
    </handlers>
    <aspNetCore processPath="dotnet" arguments=".\PowerTraderPOS.API.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" />
  </system.webServer>
</configuration>
```

### Production Deployment (Linux/Nginx)
1. Publish the application
2. Copy to server: `/var/www/powertraderpos`
3. Create systemd service: `/etc/systemd/system/powertraderpos.service`
```ini
[Unit]
Description=PowerTrader POS API

[Service]
WorkingDirectory=/var/www/powertraderpos
ExecStart=/usr/bin/dotnet /var/www/powertraderpos/PowerTraderPOS.API.dll
Restart=always
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=powertraderpos
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target
```

4. Configure Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Frontend Deployment

### Build for Production
```bash
cd PowerTraderPOS-UI
npm install
ng build --configuration production
```

Output will be in: `dist/power-trader-pos-ui/`

### Deploy to IIS
1. Copy contents of `dist/power-trader-pos-ui/browser/` to IIS website folder
2. Configure URL Rewrite for Angular routing:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Angular Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### Deploy to Nginx
```nginx
server {
    listen 80;
    server_name your-frontend-domain.com;
    root /var/www/powertraderpos-ui;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Configuration

### Backend Configuration (`appsettings.json`)
```json
{
  "ConnectionStrings": {
    "AppDbContext": "Data Source=108.60.219.173,1981; Initial Catalog=POS; Persist Security Info=True; User ID=sa; Password=TMT@2024;MultipleActiveResultSets=True"
  },
  "JwtSettings": {
    "SecretKey": "YOUR-SECURE-SECRET-KEY-HERE-CHANGE-IN-PRODUCTION",
    "Issuer": "PowerTraderPOS",
    "Audience": "PowerTraderPOS",
    "ExpiryInMinutes": 480
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**Important**: Change the JwtSettings.SecretKey in production!

### Frontend Configuration
Update API URL in `src/app/services/auth.service.ts` and `src/app/services/api.service.ts`:
```typescript
private apiUrl = 'https://your-api-domain.com/api';
```

## Security Considerations

### Production Security Checklist
- [ ] Change default JWT secret key
- [ ] Enable HTTPS/SSL
- [ ] Update default user PINs
- [ ] Configure firewall rules
- [ ] Enable SQL Server encryption
- [ ] Implement rate limiting
- [ ] Enable audit logging
- [ ] Regular security updates
- [ ] Database backup strategy
- [ ] Implement IP whitelisting if needed

### SSL Certificate Setup
For production, obtain and install SSL certificates:
- Let's Encrypt (free)
- Commercial certificate provider

## Monitoring & Maintenance

### Logging
- Backend logs: Check IIS logs or systemd journal
- Application logs: Configure in `appsettings.json`
- Database logs: SQL Server logs

### Backup Strategy
1. **Database**: Daily automated backups
2. **Application Files**: Version control + periodic backups
3. **Configuration**: Secure backup of appsettings files

### Performance Monitoring
- Monitor CPU and memory usage
- Database query performance
- API response times
- User session metrics

## Troubleshooting

### Common Issues

**1. Cannot connect to database**
- Verify SQL Server is accessible
- Check firewall rules for port 1981
- Verify credentials in connection string

**2. API returns 401 Unauthorized**
- Check JWT token expiry
- Verify user credentials
- Check CORS configuration

**3. Frontend can't reach API**
- Verify API URL in services
- Check CORS settings in backend
- Verify network connectivity

**4. Users can't login**
- Verify user exists in database
- Check PIN hash matches
- Verify JWT configuration

### Debug Mode
To enable detailed error messages, set:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug"
    }
  }
}
```

## Support & Contact
For deployment assistance, contact the development team.
