import { Card, Descriptions, Avatar, Button } from "antd";
import { useLocation, useNavigate } from "react-router";

export default function Advocate() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.item;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 sm:p-4 ">
      <Card className="w-full">
        <div className="mb-10">
          <Button type="primary" onClick={handleGoBack}>
            Go Back
          </Button>
        </div>

        <div className="flex flex-col items-center mb-4">
          <Avatar
            size={300}
            src={`https://ihostbd.info/mymendba/member_photo/${data.member_photo}`}
          />
          <h2 className="text-xl font-semibold mt-2">{data?.name}</h2>
          <p className="text-gray-500">Member ID: {data?.member_id}</p>
        </div>
        <Descriptions
          bordered
          column={1}
          size="middle"
          style={{ padding: 0, margin: 0 }}
        >
          <Descriptions.Item label="পিতার নাম">
            <strong>{data?.fname}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="রক্তের গ্রুপ">
            {data?.blood}
          </Descriptions.Item>
          <Descriptions.Item label="জন্ম তারিখ">{data?.dob}</Descriptions.Item>
          <Descriptions.Item label="মোবাইল">{data?.mobile}</Descriptions.Item>
          <Descriptions.Item label="ইমেইল">{data?.email}</Descriptions.Item>
          <Descriptions.Item label="জাতীয়তা">
            {data?.nationality}
          </Descriptions.Item>
          <Descriptions.Item label="স্থায়ী ঠিকানা">{`${data?.per_vill_home}, ${data?.per_thana}, ${data?.per_dist}, ${data?.per_post}`}</Descriptions.Item>
          <Descriptions.Item label="বর্তমান ঠিকানা">{`${data?.pre_vill_home}, ${data?.pre_thana}, ${data?.pre_dist}, ${data?.pre_post}`}</Descriptions.Item>
          <Descriptions.Item label="পেশাগত যোগদানের তারিখ">
            {data?.joining}
          </Descriptions.Item>
          <Descriptions.Item label="শিক্ষাগত যোগ্যতা">
            <div className="flex flex-col gap-2 text-xs sm:text-base">
              SSC ({data?.ssc_board}, {data?.ssc_year}, {data?.ssc_result})
              <hr className="border-gray-200 block" />
              HSC ({data?.hsc_board}, {data?.hsc_year}, {data?.hsc_result})
              <hr className="border-gray-200" />
              Hons ({data?.hons_board}, {data?.hons_year}, {data?.hons_inst},{" "}
              {data?.hons_result})<hr className="border-gray-200" />
              LLB ({data?.llb_board}, {data?.llb_year}, {data?.llb_inst},{" "}
              {data?.llb_result})<hr className="border-gray-200" />
              Masters ({data?.ms_board}, {data?.ms_year}, {data?.ms_inst},{" "}
              {data?.ms_result})
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="মনোনীত ব্যক্তি">
            {data?.nominee_name} ({data?.nominee_relation})
          </Descriptions.Item>
          <Descriptions.Item label="ধর্ম">{data?.religion}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
