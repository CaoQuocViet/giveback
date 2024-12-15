import * as XLSX from 'xlsx'
import html2pdf from 'html2pdf.js'

export const CampaignStatement = {
  exportExcel: (campaign) => {
    const excelData = campaign.donations.map(donation => ({
      'Mã đóng góp': donation.id,
      'Người đóng góp': donation.donor.name,
      'Số tiền': new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(donation.amount),
      'Phương thức': donation.payment_method,
      'Trạng thái': donation.status,
      'Thời gian': new Date(donation.created_at).toLocaleDateString('vi-VN'),
      'Ghi chú': donation.message || ''
    }));

    const distributionData = campaign.distributions.map(distribution => ({
      'Tiêu đề': distribution.title,
      'Mô tả': distribution.description,
      'Ngày cứu trợ': new Date(distribution.relief_date).toLocaleDateString('vi-VN'),
      'Ngân sách': new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(distribution.budget),
      'Số lượng người hưởng lợi': distribution.beneficiary_count,
      'Địa chỉ': `${distribution.location.address}, ${distribution.location.ward}, ${distribution.location.district}, ${distribution.location.province}`
    }));

    const wb = XLSX.utils.book_new();
    const wsDonations = XLSX.utils.json_to_sheet(excelData);
    const wsDistributions = XLSX.utils.json_to_sheet(distributionData);

    XLSX.utils.book_append_sheet(wb, wsDonations, "Donations");
    XLSX.utils.book_append_sheet(wb, wsDistributions, "Distributions");
    XLSX.writeFile(wb, `${campaign.title}_donations_and_distributions.xlsx`);
  },

  exportPDF: (campaign) => {
    const content = `
      <div style="font-family: Arial, sans-serif; color: black;">
        <h1 style="text-align: center; color: black;">Báo Cáo Chiến Dịch: ${campaign.title}</h1>
        <h2 style="color: black;">Thông tin chiến dịch</h2>
        <p style="color: black;"><strong>Tổ chức:</strong> ${campaign.charity.name}</p>
        <p style="color: black;"><strong>Thời gian:</strong> ${new Date(campaign.timeline.start_date).toLocaleDateString('vi-VN')} - ${new Date(campaign.timeline.end_date).toLocaleDateString('vi-VN')}</p>
        <h2 style="color: black;">Danh sách đóng góp</h2>
        ${campaign.donations.map(donation => `
          <div>
            <p style="color: black;"><strong>Mã đóng góp:</strong> ${donation.id}</p>
            <p style="color: black;"><strong>Người đóng góp:</strong> ${donation.donor.name}</p>
            <p style="color: black;"><strong>Số tiền:</strong> ${new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(donation.amount)}</p>
            <p style="color: black;"><strong>Phương thức:</strong> ${donation.payment_method}</p>
            <p style="color: black;"><strong>Trạng thái:</strong> ${donation.status}</p>
            <p style="color: black;"><strong>Thời gian:</strong> ${new Date(donation.created_at).toLocaleDateString('vi-VN')}</p>
            <p style="color: black;"><strong>Ghi chú:</strong> ${donation.message || ''}</p>
            <hr />
          </div>
        `).join('')}
        
        <h2 style="color: black;">Danh sách cứu trợ</h2>
        ${campaign.distributions.map(distribution => `
          <div>
            <p style="color: black;"><strong>Tiêu đề:</strong> ${distribution.title}</p>
            <p style="color: black;"><strong>Mô tả:</strong> ${distribution.description}</p>
            <p style="color: black;"><strong>Ngày cứu trợ:</strong> ${new Date(distribution.relief_date).toLocaleDateString('vi-VN')}</p>
            <p style="color: black;"><strong>Ngân sách:</strong> ${new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(distribution.budget)}</p>
            <p style="color: black;"><strong>Số lượng người hưởng lợi:</strong> ${distribution.beneficiary_count}</p>
            <p style="color: black;"><strong>Địa chỉ:</strong> ${distribution.location.address}, ${distribution.location.ward}, ${distribution.location.district}, ${distribution.location.province}</p>
            <hr />
          </div>
        `).join('')}
      </div>
    `;
  
    const opt = {
      margin: 1,
      filename: `${campaign.title}_donations_and_distributions.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().from(content).set(opt).save();
  }  
}