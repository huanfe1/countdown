import dayjs from 'dayjs';
import { Statistic } from 'antd';

export default function Center({ festivals }) {
    const { Countdown } = Statistic;
    return (
        <div className="flex flex-col items-center bg-[#F2F7FF]">
            <div>
                <span>距离</span>
                <span className="text-4xl"> {festivals[0].festival} </span>
                <span>还剩</span>
            </div>
            <Countdown
                className="my-5"
                value={dayjs(festivals[0].date)}
                format="D 天 H 小时 m 分 s 秒"
                valueStyle={{ fontSize: '4rem' }}
            />
        </div>
    );
}
