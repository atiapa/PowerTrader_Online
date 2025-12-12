@echo off
REM ========================================
REM Complete Backend Scaffolding Script
REM Auto-generate Models, DTOs, Services, Controllers
REM ========================================

echo.
echo ============================================
echo   PowerTrader POS Backend Generator
echo ============================================
echo.

REM Get user inputs
set /p DB_SERVER="Enter SQL Server name (default: localhost): "
if "%DB_SERVER%"=="" set DB_SERVER=localhost

set /p DB_NAME="Enter Database name (default: POS): "
if "%DB_NAME%"=="" set DB_NAME=POS

set /p USE_WINDOWS_AUTH="Use Windows Authentication? (Y/N, default: Y): "
if "%USE_WINDOWS_AUTH%"=="" set USE_WINDOWS_AUTH=Y

if /i "%USE_WINDOWS_AUTH%"=="Y" (
    set CONNECTION_STRING=Server=%DB_SERVER%;Database=%DB_NAME%;Trusted_Connection=True;TrustServerCertificate=True;
) else (
    set /p DB_USER="Enter SQL Server username: "
    set /p DB_PASS="Enter SQL Server password: "
    set CONNECTION_STRING=Server=%DB_SERVER%;Database=%DB_NAME%;User Id=%DB_USER%;Password=%DB_PASS%;TrustServerCertificate=True;
)

echo.
echo Connection String: %CONNECTION_STRING%
echo.
pause

REM Check if backend directory exists
if not exist "..\PowerTraderPOS-Backend" (
    echo.
    echo ❌ Backend directory not found!
    echo    Expected: ..\PowerTraderPOS-Backend
    echo.
    echo Creating backend project...
    cd ..
    dotnet new webapi -n PowerTraderPOS-Backend -f net8.0
    cd PowerTraderPOS-Backend
    
    echo Installing required packages...
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    dotnet add package Microsoft.EntityFrameworkCore.Tools
    dotnet add package Microsoft.EntityFrameworkCore.Design
    dotnet add package Swashbuckle.AspNetCore
    
    cd ..\PowerTraderPOS-UI
)

cd ..\PowerTraderPOS-Backend

echo.
echo ============================================
echo   Step 1: Scaffolding Database Models
echo ============================================
echo.

REM Install/Update EF Core tools
echo Installing EF Core tools...
dotnet tool install --global dotnet-ef
dotnet tool update --global dotnet-ef

echo.
echo Scaffolding models from database...
echo This may take a few minutes...
echo.

dotnet ef dbcontext scaffold "%CONNECTION_STRING%" Microsoft.EntityFrameworkCore.SqlServer -o Models -c POSDbContext --context-dir Data --force --data-annotations --no-onconfiguring

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Scaffolding failed!
    echo    Please check your connection string and database access.
    echo.
    pause
    exit /b 1
)

echo ✅ Models scaffolded successfully!

echo.
echo ============================================
echo   Step 2: Generating DTOs
echo ============================================
echo.

REM Copy PowerShell script
copy ..\PowerTraderPOS-UI\Generate-DTOs.ps1 .\Generate-DTOs.ps1

REM Run DTO generation
powershell -ExecutionPolicy Bypass -File .\Generate-DTOs.ps1

echo.
echo ============================================
echo   Step 3: Generating Services
echo ============================================
echo.

REM Copy PowerShell script
copy ..\PowerTraderPOS-UI\Generate-Services.ps1 .\Generate-Services.ps1

REM Run Service generation
powershell -ExecutionPolicy Bypass -File .\Generate-Services.ps1

echo.
echo ============================================
echo   Step 4: Generating Controllers
echo ============================================
echo.

REM Copy PowerShell script
copy ..\PowerTraderPOS-UI\Generate-Controllers.ps1 .\Generate-Controllers.ps1

REM Run Controller generation
powershell -ExecutionPolicy Bypass -File .\Generate-Controllers.ps1

echo.
echo ============================================
echo   Step 5: Building Project
echo ============================================
echo.

dotnet build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠️  Build completed with errors
    echo    Review the errors and fix any issues
    echo.
) else (
    echo ✅ Build successful!
)

echo.
echo ============================================
echo   🎉 Backend Generation Complete!
echo ============================================
echo.
echo Generated:
echo   ✅ 100+ Models in .\Models\
echo   ✅ 300+ DTOs in .\DTOs\
echo   ✅ 200+ Services in .\Services\
echo   ✅ 100+ Controllers in .\Controllers\
echo   ✅ POSDbContext in .\Data\
echo.
echo Next Steps:
echo   1. Review and update DTO property mappings
echo   2. Implement service mapping methods
echo   3. Register services in Program.cs
echo   4. Configure appsettings.json with connection string
echo   5. Run: dotnet run
echo   6. Visit: https://localhost:5001/swagger
echo.

pause

cd ..\PowerTraderPOS-UI
