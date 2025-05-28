/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Table, TableColumnsType } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import { Button, Input, Space } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

type DataIndex = keyof DataType;

export interface DataType {
  bar_member_no: number;
  blood: string;
  dob: string;
  email: string;
  enable: number;
  entry_by: string;
  entry_time: string;
  fname: string;
  hons_board: string;
  hons_group: string;
  hons_inst: string;
  hons_result: string;
  hons_year: string;
  hsc_board: string;
  hsc_group: string;
  hsc_inst: string;
  hsc_result: string;
  hsc_year: string;
  id: number;
  joining: string;
  llb_board: string;
  llb_group: string;
  llb_inst: string;
  llb_result: string;
  llb_year: string;
  member_id: number;
  member_photo: string;
  mname: string;
  mobile: string;
  ms_board: string;
  ms_group: string;
  ms_inst: string;
  ms_result: string;
  ms_year: string;
  name: string;
  nationality: string;
  nominee_name: string;
  nominee_relation: string;
  password: string;
  per_dist: string;
  per_post: string;
  per_thana: string;
  per_vill_home: string;
  phone_home: string;
  phone_office: string;
  pre_dist: string;
  pre_post: string;
  pre_thana: string;
  pre_vill_home: string;
  religion: string;
  retired: number;
  retired_date: string | null;
  spouse_name: string;
  ssc_board: string;
  ssc_group: string;
  ssc_inst: string;
  ssc_result: string;
  ssc_year: string;
}

export default function FindAdvocate() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    axios
      .get("https://app-mymendba.ihostbd.info/api/member_list", {
        headers: { "X-API-KEY": "jEnEbfKXC3Qq3KDBBozWUdIWJllikkzt" },
      })
      .then((response) => {
        const sortedData = response.data.sort((a: any, b: any) => {
          return a.member_id - b.member_id;
        });
        console.log("sort", sortedData);
        setData(sortedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const tableData = data?.map((item: DataType) => {
    return { ...item, key: item.member_id };
  });

  // handel antd search function
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#DE4747" : "#2F9736",
          fontSize: "20px",
          fontWeight: 800,
        }}
      />
    ),
    onFilter: (value: any | null, record: any | null) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "member_id",
      ...getColumnSearchProps("member_id"),
      render: (member_id, item: DataType) => (
        <Link
          to={`/advocate`}
          state={{ item }}
          className="px-3 py-2 rounded-md font-bold bg-blue-500  border"
        >
          {member_id}
        </Link>
      ),
    },
    {
      title: "Photo",
      dataIndex: "member_photo",
      render: (member_photo) => (
        <Image
          src={`https://ihostbd.info/mymendba/member_photo/${member_photo}`}
          width={50}
          className=""
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      render: (name, item: DataType) => (
        <Link to={`/advocate`} state={{ item }} className="font-bold">
          {name}
        </Link>
      ),
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
      ...getColumnSearchProps("mobile"),
    },
  ];

  return (
    <div>
      <div></div>
      <div className="w-full overflow-x-auto bg-white">
        <Table<DataType>
          columns={columns}
          dataSource={tableData}
          loading={loading}
        />
      </div>
    </div>
  );
}
