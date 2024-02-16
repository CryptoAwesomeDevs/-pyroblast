import React from 'react';
import {
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { OptionSelector } from 'app/components/options-trading/bidding/OptionSelector';
import { useOptionsStore } from 'app/store';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { BigNumber, ethers } from 'ethers';
import { generateTimeIntervals } from 'app/utils/time';
import { useContractRead } from 'wagmi';
import { OptionABI } from 'app/web3/contracts/OptionAbi';

const StyledOptionChartContainer = styled.div(({ theme }) => ({
  position: 'relative',
  background: theme.bgColorPrimary,
  borderRadius: theme.primaryBorderRadius,
  padding: 20,
  height: '100%',
  width: '100%',

  '*:focus-visible': {
    outline: 'none',
  },
}));
const formatTick = (tick: number) => {
  const date = new Date(tick * 1000);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'transparent', padding: '5px', outline: 'none', border: 'none', fontSize: 12 }}>
        <p>{formatTick(payload[0].payload.time as number)}</p>
        <p>{parseFloat((payload[0]?.value as string) ?? '0').toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export const OptionChart = () => {
  const priceData = useOptionsStore((state) => state.selectedOptionPriceData);
  const currOption = useOptionsStore((state) => state.selectedOptionInfo);
  const prevOption = useOptionsStore((state) => state.selectedOptionPrevInfo);

  const yDataKey = 'price';
  const timeIntervals = generateTimeIntervals();
  const lastTimePoint = timeIntervals[timeIntervals.length - 1];
  const currOptionLockStart = currOption.lockStart;
  const prevOptionEnd = prevOption.optionEnd;

  const optionDuration = currOption.optionStart - prevOption.optionStart;
  const lockDuration = currOptionLockStart - currOption.optionStart;
  const prevPrevOptionStart = prevOption.optionStart - optionDuration;
  const prevPrevOptionLockStart = prevPrevOptionStart + lockDuration;
  const prevPrevOptionStartX = timeIntervals[0] > prevPrevOptionStart ? timeIntervals[0] : prevPrevOptionStart;
  const prevOptionEndX = prevOptionEnd > lastTimePoint ? lastTimePoint : prevOptionEnd;
  const currentOptionLockStartX = currOptionLockStart > lastTimePoint ? lastTimePoint : currOptionLockStart;

  const theme = useTheme();

  const { data: prevPrevOptionInfo } = useContractRead({
    address: currOption.address,
    abi: OptionABI,
    functionName: 'getOptionInfo',
    args: [BigNumber.from(prevOption.id - 1)],
    enabled: prevOption.id > 1,
  });

  return (
    <StyledOptionChartContainer>
      <OptionSelector />
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart data={priceData.filter((i) => i.time > (Date.now() - 2700000) / 1000)}>
          <YAxis
            type="number"
            orientation="right"
            width={50}
            dataKey={yDataKey}
            domain={['dataMin - 1', 'dataMax + 1']}
            tickFormatter={(i) => parseFloat(i).toFixed(2)}
            fontSize={12}
            tickCount={6}
            interval={'preserveStartEnd'}
          />
          <XAxis
            type="number"
            dataKey={'time'}
            domain={[timeIntervals[0], timeIntervals[timeIntervals.length - 1]]}
            tickFormatter={formatTick}
            ticks={timeIntervals}
            interval={'preserveStartEnd'}
            fontSize={12}
          />

          <Tooltip content={CustomTooltip} />
          {prevPrevOptionInfo && (
            <ReferenceLine
              segment={[
                {
                  x: prevPrevOptionLockStart,
                  y: parseFloat(ethers.utils.formatEther(prevPrevOptionInfo.startPrice)),
                },
                {
                  x: prevOption.lockStart,
                  y: parseFloat(ethers.utils.formatEther(prevPrevOptionInfo.startPrice)),
                },
              ]}
              stroke={theme.bgColorTertiary}
              strokeWidth={1}
              strokeOpacity={0.085}
            />
          )}

          <ReferenceLine
            segment={[
              {
                x: prevOption.lockStart,
                y: parseFloat(ethers.utils.formatEther(prevOption.startPrice)),
              },
              {
                x: prevOptionEndX,
                y: parseFloat(ethers.utils.formatEther(prevOption.startPrice)),
              },
            ]}
            stroke={theme.bgColorTertiary}
            strokeWidth={1}
            strokeOpacity={0.17}
          />

          <ReferenceArea
            x1={prevPrevOptionStartX}
            x2={prevPrevOptionLockStart}
            fill={theme.bgColorTertiary}
            opacity={0.17}
          />

          <ReferenceArea
            x1={prevOption.optionStart}
            x2={prevOption.lockStart}
            fill={theme.bgColorTertiary}
            opacity={0.25}
          />

          <ReferenceArea
            x1={currOption.optionStart}
            x2={currentOptionLockStartX}
            fill={theme.bgColorTertiary}
            opacity={0.6}
          />

          <Line
            dataKey={yDataKey}
            type="monotone"
            stroke={theme.bgColorTertiary}
            strokeWidth={1.5}
            dot={false}
            animateNewValues={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledOptionChartContainer>
  );
};
