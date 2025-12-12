import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  constructor() {}

  printReport(reportData: any, reportType: string, title: string): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups for this website to print reports.');
      return;
    }

    const html = this.generateReportHTML(reportData, reportType, title);
    printWindow.document.write(html);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }

  private generateReportHTML(data: any, reportType: string, title: string): string {
    const styles = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          padding: 20mm;
          font-size: 12pt;
        }
        .report-header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
        }
        .report-header h1 {
          font-size: 24pt;
          margin-bottom: 10px;
        }
        .report-header .date {
          color: #666;
          font-size: 10pt;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .summary {
          margin: 30px 0;
          padding: 20px;
          background-color: #f5f5f5;
          border-left: 4px solid #3f51b5;
        }
        .summary h2 {
          margin-bottom: 15px;
          color: #3f51b5;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          padding: 8px 0;
          border-bottom: 1px solid #ddd;
        }
        .summary-item:last-child {
          border-bottom: none;
          font-weight: bold;
          font-size: 14pt;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          color: #666;
          font-size: 10pt;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    `;

    let content = '';
    
    switch (reportType) {
      case 'table':
        content = this.generateTableReport(data);
        break;
      case 'summary':
        content = this.generateSummaryReport(data);
        break;
      case 'detailed':
        content = this.generateDetailedReport(data);
        break;
      default:
        content = this.generateTableReport(data);
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          ${styles}
        </head>
        <body>
          <div class="report-header">
            <h1>${title}</h1>
            <p class="date">Generated on: ${new Date().toLocaleString()}</p>
          </div>
          ${content}
          <div class="footer">
            <p>PowerTrader POS System - Confidential Report</p>
            <p>Page printed on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;
  }

  private generateTableReport(data: any[]): string {
    if (!data || data.length === 0) {
      return '<p>No data available for this report.</p>';
    }

    const headers = Object.keys(data[0]);
    let html = '<table><thead><tr>';
    
    headers.forEach(header => {
      html += `<th>${this.formatHeader(header)}</th>`;
    });
    html += '</tr></thead><tbody>';

    data.forEach(row => {
      html += '<tr>';
      headers.forEach(header => {
        html += `<td>${this.formatValue(row[header])}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
  }

  private generateSummaryReport(data: any): string {
    let html = '<div class="summary"><h2>Summary</h2>';
    
    Object.keys(data).forEach(key => {
      html += `
        <div class="summary-item">
          <span>${this.formatHeader(key)}</span>
          <span><strong>${this.formatValue(data[key])}</strong></span>
        </div>
      `;
    });

    html += '</div>';
    return html;
  }

  private generateDetailedReport(data: any): string {
    let html = this.generateSummaryReport(data.summary || {});
    
    if (data.items) {
      html += this.generateTableReport(data.items);
    }

    return html;
  }

  private formatHeader(header: string): string {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private formatValue(value: any): string {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') {
      return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return String(value);
  }

  exportToCSV(data: any[], filename: string): void {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    let csv = headers.join(',') + '\n';

    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return `"${value}"`;
      });
      csv += values.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToPDF(reportData: any, reportType: string, title: string): void {
    // For basic PDF, we'll use print-to-PDF functionality
    this.printReport(reportData, reportType, title);
  }
}
