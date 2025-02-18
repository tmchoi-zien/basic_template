import ProgressBar from "@ramonak/react-progress-bar";

export interface Props {
  completed: string;
  height?: string;
  width?: string;
  bgColor?: string;
}

export default function Progress({
  completed,
  height,
  width,
  bgColor = "#0E1B6B",
}: Props) {
  return (
    <div data-testid="progress-bar">
      <ProgressBar
        completed={completed}
        height={height}
        width={width}
        bgColor={bgColor}
        isLabelVisible={false}
      />
    </div>
  );
}
