import { useEffect, useRef, useState } from "react";

const CountDown = ({ onTimeUp }) => {
  const [count, setCount] = useState(500);
  const onTimeUpRef = useRef(onTimeUp);

  // luôn cập nhật ref mỗi khi prop thay đổi
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUpRef.current?.(); // gọi đúng callback mới nhất, không cần trong deps
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // ✅ chỉ chạy 1 lần, không cần thêm onTimeUp vào

  return <div className="countdown-container">{toHHMMSS(count)}</div>;
};

export default CountDown;
