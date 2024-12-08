import { iArticle } from "@/components/news/shared/interfaces"

import { KHANHND, VIETCQ } from "./_NEW_SETUP"

const ARTICLES_LIST: iArticle[] = [
  {
    path: "/news/all-news/cac-tinh-con-du-2000ty-quy-phong-chong-thien-tai",
    featureArticle: true,
    preview: {
      author: KHANHND,
      date: "September 18 2024",
      articleTitle:
        "Các tỉnh thành còn dư hơn 2.200 tỷ đồng Quỹ Phòng chống thiên tai",
      tags: "thiên tai, quỹ phòng chống, cứu trợ",
      thumbnail: "/news_imp_assets/news/01.png",
      shortIntro:
        "Các tỉnh thành còn dư hơn 2.200 tỷ đồng, nhưng thiệt hại sau bão Yagi hơn 3.200 tỷ.",
      category: "tin tức",
    },
    seo: {
      title: "Quỹ Phòng chống thiên tai các tỉnh còn dư hơn 2.200 tỷ đồng",
      description:
        "Cập nhật tình hình Quỹ Phòng chống thiên tai tại các tỉnh thành",
      keywords: "quỹ phòng chống thiên tai, cứu trợ bão lụt, thiệt hại do bão",
      ogImage: "/news_imp_assets/news/01.png",
      author: KHANHND.name,
    },
  },
  {
    path: "/news/all-news/trong-mat-bao-yagi-15-gio-yagi-tan-pha-mien-bac",
    featureArticle: true,
    preview: {
      author: VIETCQ,
      date: "September 17 2024",
      articleTitle: "Trong mắt bão Yagi: 15 giờ Yagi tàn phá miền Bắc",
      tags: "bão Yagi, thiên tai, miền Bắc",
      thumbnail: "/news_imp_assets/news/02.png",
      shortIntro:
        "Yagi quét qua Việt Nam, xé toạc mái nhà và gây lũ lụt nghiêm trọng.",
      category: "tin tức",
    },
    seo: {
      title: "15 giờ bão Yagi tàn phá miền Bắc Việt Nam",
      description: "Diễn biến chi tiết cơn bão Yagi tại miền Bắc",
      keywords: "bão Yagi, thiệt hại do bão, thiên tai miền Bắc",
      ogImage: "/news_imp_assets/news/02.png",
      author: VIETCQ.name,
    },
  },
  {
    path: "/news/all-news/vietbank-ung-ho-yagi",
    preview: {
      author: KHANHND,
      date: "September 17 2024",
      articleTitle:
        "Vietbank quyên góp 700 triệu đồng ủng hộ người dân bị ảnh hưởng thiên tai",
      tags: "Vietbank, quyên góp, cứu trợ",
      thumbnail: "/news_imp_assets/news/03.png",
      shortIntro:
        "Vietbank quyên góp 700 triệu đồng ủng hộ người dân bị ảnh hưởng thiên tai.",
      category: "cứu trợ",
    },
    seo: {
      keywords: "Vietbank, quyên góp từ thiện, cứu trợ bão lụt",
      ogImage: "/news_imp_assets/news/03.png",
    },
  },
  {
    path: "/news/all-news/carlsberg-va-nhan-vien-ho-tro-vung-bao-yagi",
    preview: {
      author: VIETCQ,
      date: "September 17 2024",
      articleTitle:
        "Carlsberg Việt Nam và nhân viên hỗ trợ 1,1 tỷ đồng cho vùng bão lũ",
      tags: "Carlsberg, quyên góp, cứu trợ",
      thumbnail: "/news_imp_assets/news/04.png",
      shortIntro:
        "Carlsberg Việt Nam và nhân viên hỗ trợ 1,1 tỷ đồng cho vùng bão lũ.",
      category: "cứu trợ",
    },
    seo: {
      keywords: "Carlsberg Việt Nam, quyên góp từ thiện, cứu trợ bão lụt",
      ogImage: "/news_imp_assets/news/04.png",
    },
  },
  {
    path: "/news/all-news/bao-hinh-thanh-va-chet-nhu-the-nao",
    preview: {
      author: KHANHND,
      date: "September 16 2024",
      articleTitle: "Bão hình thành và 'chết' như thế nào?",
      tags: "bão, khí tượng, thiên tai",
      thumbnail: "/news_imp_assets/news/15.png",
      shortIntro:
        "Bão hình thành khi có áp suất khí quyển thấp ở vùng nước ấm, dần mạnh lên rồi lại suy yếu hoặc tan hẳn khi quét qua mặt đất.",
      category: "tin tức",
    },
    seo: {
      keywords: "hình thành bão, suy yếu bão, khí tượng học",
      ogImage: "/news_imp_assets/news/15.png",
    },
  },
  {
    path: "/news/all-news/chu-quan-de-nghi-khach-thanh-toan-vao-tai-khoan-mat-tran-to-quoc",
    preview: {
      author: VIETCQ,
      date: "September 16 2024",
      articleTitle:
        "Chủ quán đề nghị khách thanh toán vào tài khoản Mặt trận Tổ quốc",
      tags: "quyên góp, cứu trợ, cộng đồng",
      thumbnail: "/news_imp_assets/news/16.png",
      shortIntro:
        "Chủ quán cà phê ở Tam Kỳ đề nghị khách thanh toán tiền đồ uống bằng cách chuyển khoản cho Mặt trận Tổ quốc.",
      category: "cứu trợ",
    },
    seo: {
      keywords: "quyên góp từ thiện, cứu trợ bão lụt, cộng đồng hỗ trợ",
      ogImage: "/news_imp_assets/news/16.png",
    },
  },
  {
    path: "/news/all-news/hau-qua-bao-yagi",
    preview: {
      author: KHANHND,
      date: "September 16 2024",
      articleTitle: "Cập nhật hậu quả sau bão Yagi",
      tags: "bão Yagi, thiệt hại, thống kê",
      thumbnail: "/news_imp_assets/news/17.png",
      shortIntro:
        "12 ngày sau bão Yagi, lũ quét và sạt lở đã làm 299 người chết, 34 mất tích, trong đó Lào Cai là tỉnh chịu thương vong nhiều nhất.",
      category: "tin tức",
    },
    seo: {
      keywords: "hậu quả bão Yagi, thiệt hại do bão, thống kê thiệt hại",
      ogImage: "/news_imp_assets/news/17.png",
    },
  },
]

export const SORTED_ARTICLES_BY_DATE = ARTICLES_LIST.sort((a, b) =>
  new Date(a.preview.date) > new Date(b.preview.date) ? -1 : 1
)
