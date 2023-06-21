import { Popconfirm, Tooltip, Statistic } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import classNames from 'classnames';

export default function List({ festivals, setFestivals }) {
    const { Countdown } = Statistic;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const titleRef = useRef(null);
    const confirm = index => {
        setFestivals(festivals.filter((_, i) => i !== index));
    };
    festivals.sort((a, b) => dayjs(a.date) - dayjs(b.date));
    const click = () => {
        titleRef.current.requestFullscreen();
    };
    addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            setIsFullscreen(true);
        } else {
            setIsFullscreen(false);
        }
    });
    if (festivals.length === 0)
        return (
            <div className="mt-56 text-center text-4xl">
                <p>暂时没有倒数日</p>
                <p>点击左上角 + 号添加一个吧</p>
            </div>
        );
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
                        <li className="mx-auto my-3 box-border flex w-80 cursor-pointer items-center justify-between rounded-xl bg-white p-3 shadow">
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
