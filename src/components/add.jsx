import { DatePicker, Button, Input, message, Modal } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function Add({ festivals, setFestivals }) {
    const [status, setStatus] = useState({ festival: '', date: null });
    const [isclick, setIsclick] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const changeDate = data => {
        setStatus({ ...status, date: dayjs(data) });
    };
    const changeFestival = e => {
        setStatus({ ...status, festival: e.target.value });
    };
    const click = () => {
        setIsclick(true);
        if (!status.date) messageApi.error('请选择日期');
        if (!status.festival) messageApi.error('请输入节日');
        if (!status.date || !status.festival) return;
        setFestivals([...festivals, status]);
        setIsclick(false);
        setIsModalOpen(false);
        setStatus({ festival: '', date: null });
    };
    const disabledDate = current => {
        return current && current < dayjs().endOf('day');
    };
    return (
        <>
            <div
                onClick={() => {
                    setIsModalOpen(true);
                }}
                className="fixed left-12 top-12 flex cursor-pointer rounded-full bg-white p-3 shadow hover:text-blue-500"
            >
                <PlusSvg />
            </div>
            <Modal
                title="添加新节日"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                footer={null}
                width={400}
            >
                <DatePicker
                    size="large"
                    disabledDate={disabledDate}
                    className="mt-5 w-full"
                    status={isclick && !status.date ? 'error' : ''}
                    onChange={changeDate}
                    locale={locale}
                    allowClear={false}
                    value={status.date}
                    showToday={false}
                />
                <Input
                    placeholder="请输入节日"
                    status={isclick && !status.festival ? 'error' : ''}
                    size="large"
                    allowClear
                    className="my-5"
                    onChange={changeFestival}
                    value={status.festival}
                />
                <Button type="primary" size="large" onClick={click} className="mx-auto block w-1/3">
                    {contextHolder}
                    添加
                </Button>
            </Modal>
        </>
    );
}

function PlusSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
        </svg>
    );
}
