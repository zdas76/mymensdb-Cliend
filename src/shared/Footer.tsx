import { Divider } from "antd";

export default function Footer() {
  const date = new Date();
  return (
    <div className="py-10 bg-gray-100">
      <div className=""></div>
      <Divider />
      <div>
        <p className="text-center">
          © {date.getFullYear()} District Bar Association Mymensingh™. All
          Rights Reserved.
        </p>
      </div>
    </div>
  );
}
