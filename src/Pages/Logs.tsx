import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAppSelector, useAppDispatch } from "../Redux/hooks";
import { useLocation } from "wouter";
import Log from "../Types/logType";
import { setActiveLog } from "../Redux/slices/logSlice";

const Logs = () => {
  const logs = useAppSelector((state) => state.log.value) as Log[];
  const [, navigate] = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    dispatch(setActiveLog(id));
    navigate(`/map/${id}`);
  };

  const columns: ColumnsType<Log> = [
    {
      title: "Roll Number",
      dataIndex: "rollNo",
      key: "rollNo",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "lat",
    },
    {
      title: "Longitude",
      dataIndex: "long",
      key: "long",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Action",
      key: "Action",
      render: (_, render) => (
        <a onClick={() => handleClick(render.logId)}>View on Map</a>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={logs}
        pagination={false}
        scroll={{ y: "calc(80vh - 115px)" }}
      />
    </div>
  );
};

export default Logs;
