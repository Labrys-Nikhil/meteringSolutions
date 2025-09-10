

import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InvoiceContent from '../components/invoice/InvoiceContent';

const MeterReadingInvoice = () => {
  const invoiceRef = useRef();

  const downloadPDF = async () => {
    const element = invoiceRef.current;

    if (!element) {
      alert('Invoice content not found. Please try again.');
      return;
    }

    // Store original scroll position and zoom
    const originalScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const originalScrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const originalZoom = document.body.style.zoom;
    const originalTransform = document.body.style.transform;

    try {
      // Detect current zoom level
      const currentZoom = window.devicePixelRatio;
      console.log('Current zoom level:', currentZoom);

      // Temporarily reset zoom to 100% for consistent rendering
      document.body.style.zoom = '1';
      document.body.style.transform = 'scale(1)';
      
      // Scroll to top-left to ensure full visibility
      window.scrollTo(0, 0);
      
      // Wait for zoom reset and scroll to complete
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Starting PDF generation...');
      console.log('Element dimensions:', {
        width: element.offsetWidth,
        height: element.offsetHeight,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight
      });

      // Get the actual content dimensions at 100% zoom
      const elementRect = element.getBoundingClientRect();
      const actualWidth = Math.max(element.offsetWidth, element.scrollWidth);
      const actualHeight = Math.max(element.offsetHeight, element.scrollHeight);

      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        width: actualWidth,
        height: actualHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: actualWidth,
        windowHeight: actualHeight,
        // Force the canvas to use the actual dimensions
        onclone: (clonedDoc) => {
          // Ensure the cloned document has consistent styling
          const clonedElement = clonedDoc.querySelector('[data-html2canvas-clone]');
          if (clonedElement) {
            clonedElement.style.width = actualWidth + 'px';
            clonedElement.style.height = actualHeight + 'px';
            clonedElement.style.transform = 'scale(1)';
            clonedElement.style.zoom = '1';
          }
          
          // Reset any zoom/transform on the cloned document
          clonedDoc.body.style.zoom = '1';
          clonedDoc.body.style.transform = 'scale(1)';
          clonedDoc.documentElement.style.zoom = '1';
        },
        ignoreElements: (element) => {
          return element.classList && element.classList.contains('no-print');
        }
      });

      console.log('Canvas created:', {
        width: canvas.width,
        height: canvas.height
      });

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas has zero dimensions');
      }

      // Get the canvas data
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      if (!imgData || imgData === 'data:,') {
        throw new Error('Failed to generate image data');
      }

      console.log('Image data generated successfully');
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fill the entire page width
      const imgProps = pdf.getImageProperties(imgData);
      const imgRatio = imgProps.height / imgProps.width;
      
      // Use full page width (no margins)
      const imgWidth = pdfWidth;
      const imgHeight = pdfWidth * imgRatio;

      // Check if content fits in one page
      if (imgHeight <= pdfHeight) {
        // Single page - fits perfectly
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Multi-page handling
        let remainingHeight = imgHeight;
        let currentY = 0;
        let pageNumber = 1;
        
        while (remainingHeight > 0) {
          // Calculate how much content fits on current page
          const pageContentHeight = Math.min(remainingHeight, pdfHeight);
          
          // Calculate source Y position for cropping
          const sourceY = (pageNumber - 1) * pdfHeight;
          const sourceHeight = pageContentHeight;
          
          // Calculate source dimensions in canvas pixels
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const canvasRatio = canvasHeight / canvasWidth;
          
          // Calculate crop area in canvas coordinates
          const cropY = (sourceY / imgHeight) * canvasHeight;
          const cropHeight = (sourceHeight / imgHeight) * canvasHeight;
          
          // Create a temporary canvas for this page
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          
          tempCanvas.width = canvasWidth;
          tempCanvas.height = cropHeight;
          
          // Draw the cropped portion
          tempCtx.drawImage(
            canvas, 
            0, cropY, canvasWidth, cropHeight, // Source crop area
            0, 0, canvasWidth, cropHeight      // Destination
          );
          
          // Convert to image data
          const pageImgData = tempCanvas.toDataURL('image/png', 1.0);
          
          // Add page if not the first one
          if (pageNumber > 1) {
            pdf.addPage();
          }
          
          // Calculate dimensions for this page
          const pageImgRatio = cropHeight / canvasWidth;
          const pageImgHeight = pdfWidth * pageImgRatio;
          
          // Add image to PDF page (full width, positioned at top)
          pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pageImgHeight);
          
          // Update for next iteration
          remainingHeight -= pdfHeight;
          pageNumber++;
          
          // Clean up temporary canvas
          tempCanvas.remove();
        }
      }

      console.log('PDF generated successfully with', pdf.internal.pages.length - 1, 'pages');

      // Save the PDF
      pdf.save('meter-invoice.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error.message}. Please check the console for details.`);
    } finally {
      // Restore original zoom, transform, and scroll position
      if (originalZoom) {
        document.body.style.zoom = originalZoom;
      } else {
        document.body.style.zoom = '';
      }
      
      if (originalTransform) {
        document.body.style.transform = originalTransform;
      } else {
        document.body.style.transform = '';
      }
      
      window.scrollTo(originalScrollLeft, originalScrollTop);
    }
  };

  // Your invoice data and format functions
  const invoiceData = {
    invoiceNumber: "ELE-2025-001234",
    accountNumber: "4789-6512-3847",
    customerInfo: {
      name: "Avinash Yadav",
      address: "1247 Oakwood Drive",
      city: "Springfield",
      state: "Illinois",
      zipCode: "62701",
      phone: "(555) 123-4567",
      email: "john.smith@email.com"
    },
    utilityCompany: {
      name: "Smartlynk Power Solutions Pvt Ltd",
      address: "2500 Corporate Plaza, Suite 800",
      city: "Springfield",
      state: "Illinois",
      zipCode: "62702",
      phone: "(555) 987-6543",
      email: "billing@smartlynk.com",
      website: "www.smartlynk.net",
      license: "Electric Utility License #EUL-2024-IL-789"
    },
    billingPeriod: {
      from: "2024-12-01",
      to: "2024-12-31",
      days: 31
    },
    meterReadings: [
      {
        meterType: "Smart Digital Meter",
        meterNumber: "ELE-SM-445789",
        meterLocation: "Main Service Panel",
        previousReading: 45678,
        currentReading: 46234,
        usage: 556,
        unit: "kWh",
        peakUsage: 334,
        offPeakUsage: 222,
        peakRate: 0.1450,
        offPeakRate: 0.0890,
        peakAmount: 48.43,
        offPeakAmount: 19.76,
        amount: 68.19
      }
    ],
    tariff: {
      rate:7,
    },
    charges: {
      energyCharges: 68.19,
      deliveryCharges: 24.50,
      connectionFee: 12.00,
      regulatoryFees: 3.85,
      subtotal: 108.54,
      tax: 8.68,
      total: 117.22
    },
    dueDate: "2025-01-31",
    issueDate: "2025-01-03",
    readDate: "2024-12-31",
    paymentTerms: "Net 30 Days"
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="">
      <div className="no-print bg-cyan-600 px-4 flex justify-between mb-4 py-1 items-center sticky top-0 bg- z-10 ">
        <h2 className="text-2xl font-bold text-white mb-1">INVOICE</h2>
        <button
          onClick={downloadPDF}
          className="bg-cyan-500 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 inline-flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
      </div>
    <div className="p-4">
      {/* Only this button is outside the PDF area */}
      

      {/* This section only will be in PDF */}
      <div 
        ref={invoiceRef}
        style={{
          width: '210mm', // Full A4 width
          minHeight: '297mm', // Full A4 height
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          padding: '2px', // No padding to use full page
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          footer: '2px',
          header: '2px',
          lineHeight: '1',
          color: '#333',
          position: 'relative',
          // Ensure consistent rendering regardless of zoom
          transform: 'scale(1)',
          transformOrigin: 'top left',
          zoom: '1'
        }}
      >
        <InvoiceContent
          invoiceData={invoiceData}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
    </div>
  );
};

export default MeterReadingInvoice;