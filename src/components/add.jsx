import { DatePicker, Button, Input, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function Add({ festivals, setFestivals }) {
    const [status, setStatus] = useState({ festival: '', date: null });
    const [isclick, setIsclick] = useState(false);
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
        setStatus({ festival: '', date: null });
    };
    const disabledDate = current => {
        return current && current < dayjs().endOf('day');
    };
    return (
        <>
            <DatePicker
                size="large"
                disabledDate={disabledDate}
                className="w-full"
                status={isclick && !status.date ? 'error' : ''}
                onChange={changeDate}
                locale={locale}
                allowClear={false}
                value={status.date}
            />
            <div className="my-5">
                <Input
                    placeholder="请输入节日"
                    status={isclick && !status.festival ? 'error' : ''}
                    size="large"
                    allowClear
                    onChange={changeFestival}
                    value={status.festival}
                />
            </div>
            <Button type="primary" size="large" onClick={click} className="w-full">
                {contextHolder}
                添加
            </Button>
        </>
    );
}
