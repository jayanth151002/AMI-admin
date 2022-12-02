import { Card, Table } from "antd";
import { useLocation } from "wouter";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setActiveLog } from "../Redux/slices/logSlice";

const ProfileLog = () => {
  const newLog = useAppSelector((state) => state.log.newLog);
  const [, navigate] = useLocation();
  const dispatch = useAppDispatch();
  const handleClick = (id: string) => {
    dispatch(setActiveLog(id));
    navigate(`/map/${id}`);
  };
  const friendsDetails = (newLog?.profile as any)?.frndData?.fPhNo.map(
    (friend: any, index: number) => ({
      fName: (newLog?.profile as any)?.frndData?.fName[index],
      fRollNo: (newLog?.profile as any)?.frndData?.fRollNo[index],
      fPhNo: friend,
    })
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "fName",
      key: "fName",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Roll Number",
      dataIndex: "fRollNo",
      key: "fRollNo",
    },
    {
      title: "Phone Number",
      dataIndex: "fPhNo",
      key: "fPhNo",
    },
  ];
  return (
    <div>
      {Object.keys(newLog.log).length === 0 ? (
        <div>No Profile to View</div>
      ) : (
        <div>
          <Card
            hoverable
            title={(newLog?.profile as any).name}
            style={{ width: 500 }}
            extra={
              <a onClick={() => handleClick((newLog?.log as any).logId)}>
                View on Map
              </a>
            }
          >
            <p>Roll Number: {(newLog.profile as any).rollNo}</p>
            <p>Friends Details</p>
            <div>
              <Table
                columns={columns}
                dataSource={friendsDetails}
                pagination={{ position: ["none", "none"] as any }}
              />
            </div>
            <p>Date and Time : {(newLog.log as any).timestamp}</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfileLog;
