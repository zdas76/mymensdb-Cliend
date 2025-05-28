import { Button, Flex, Form, Input } from "antd";

export default function Contact() {
  const [form] = Form.useForm();

  return (
    <div>
      <div className="py-10 bg-white w-[calc(100%-250px)] mx-auto mt-20">
        <Form
          form={form}
          scrollToFirstError={{
            behavior: "instant",
            block: "end",
            focus: true,
          }}
          style={{ paddingBlock: 2 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="bio" label="Bio" rules={[{ required: true }]}>
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6 }}>
            <Flex gap="small">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button danger onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
