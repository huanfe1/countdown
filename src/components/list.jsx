import { Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';

export default function List({ festivals, setFestivals }) {
    const confirm = index => {
        setFestivals(festivals.filter((_, i) => i !== index));
    };
    festivals.sort((a, b) => dayjs(a.date) - dayjs(b.date));
    return (
        <ul className="mt-8 p-0">
            {festivals.map((item, index) => {
                return (
                    <Popconfirm
                        key={index}
                        title="确定要删除吗"
                        onConfirm={() => {
                            confirm(index);
                        }}
                        okText="确定"
                        cancelText="取消"
                        placement="right"
                    >
                        <li className="my-3 box-border flex w-full items-center justify-between rounded-xl bg-white p-3 shadow">
                            <span>{item.festival}</span>
                            <Tooltip title={dayjs(item.date).format('YYYY-MM-DD')}>
                                <span>{'还剩' + dayjs(item.date).diff(dayjs(), 'days') + '天'}</span>
                            </Tooltip>
                        </li>
                    </Popconfirm>
                );
            })}
        </ul>
    );
}
