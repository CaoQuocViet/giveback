
import TextReveal from "@/components/magicui/text-reveal";

export default async function NostalgiaPage() {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center rounded-lg border bg-white dark:bg-black">
      <TextReveal

        text="Quyên góp cho vùng thiên tai.
        Công khai, minh bạch và hiệu quả"
      />

      <TextReveal
        text="Dự án quyên góp từ thiện nhằm kết nối tấm lòng hảo tâm với nạn nhân thiên tai ở Việt Nam. Mục tiêu là xây dựng nền tảng minh bạch và hiệu quả, giúp người dân dễ dàng đóng góp cho các tổ chức từ thiện uy tín, khôi phục cuộc sống cho nạn nhân."
      />
    </div>
  );
}
