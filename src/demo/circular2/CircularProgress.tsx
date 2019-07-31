import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'
import GestureTouchable from './gestureTouchable';
import { Colors } from "../../util/designSystem";
import { BaseProps } from '../../common/baseProps';

interface Props extends BaseProps {
    percentage: number;
    blankColor: string;
    donutColor: string;
    fillColor: string;
    progressWidth: string;
    size: number;
    children: React.ReactNode;
    onRecordStart: () => void;
    onRecordFinish: (arrow: boolean) => void;
    onRecording: (isRecord: boolean) => void;
    onTakePhote: () => void;
}

export enum RecordStatus {
    TAKE = "TAKE",
    RECORD = "RECORD",
}

interface State {
    status: RecordStatus;
    progress: number;
}

// 毫秒，长按判断，大于1000毫秒
const longPressLimit = 250;
// 最大录音15s
const MAX_RECORD_SECONDS = 15; // 15s
// 每1%时间间隔
const INTERVAL = MAX_RECORD_SECONDS / 100 * 1000; // 150 ms
// 如果达到肉眼看不见的帧率则是60frame, 16ms 刷新一次
const INTERVAL_HIGH = 16; // ms

const PROGRESS_HIGH_PER = 0.0107;

export default class CircularProgress extends Component<Props, State>{

    static defaultProps = {
        percentage: 40,
        blankColor: "#ffffff7d",
        donutColor: "#4AB9F0",
        fillColor: "#ffffff7d",
        progressWidth: 45,
        size: 100,
    };

    allow = false;
    gestureTouchable: GestureTouchable | null = null;
    private time: number = 0;
    private timer: NodeJS.Timeout | null = null;
    private touchMoveFirst: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            status: RecordStatus.TAKE,
            progress: 0,
        }
    }

    render() {
        return (<GestureTouchable
            style={[styles.holdRecordContainer]}
            onTouchStart={() => {
                this.initRecordUI();
                this.time = new Date().getTime();
                this.touchMoveFirst = false;
                console.log('onTouchStart');
            }}
            onTouchMove={(evt) => {
                const curTime = new Date().getTime();
                const diff = curTime - this.time;
                console.log('onTouchMove diff : ', diff);
                if (diff > longPressLimit) {
                    // 大于 1s 长按，开始录制
                    if (!this.touchMoveFirst) {
                        if (this.props.onRecordStart) {
                            this.props.onRecordStart();
                        }
                        this.startTimer();
                        this.touchMoveFirst = true;
                        this.changeState(RecordStatus.RECORD);
                    }
                }
            }}
            onTouchEnd={() => {
                console.log('onTouchEnd');
                const curTime = new Date().getTime();
                const diff = curTime - this.time;
                if (diff > longPressLimit) {
                    // 结束录制
                    if (this.props.onRecordFinish) {
                        this.props.onRecordFinish(this.allow);
                    }
                    this.reset();
                } else {
                    // 小于1s 说明是点击 拍照
                    if (this.props.onTakePhote) {
                        this.props.onTakePhote();
                    }
                }
                this.changeState(RecordStatus.TAKE);
            }}
            ref={(ref) => {
                this.gestureTouchable = ref;
            }}
        >
            {this.renderContent()}
        </GestureTouchable>);

    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    private startTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.setState(prevState => {
                let progress = prevState.progress + 1;
                if (progress > 100) {
                    progress = 0;
                }
                console.log('onRecord progress:', progress);
                return {
                    progress
                };
            }, () => {
                this.startTimer();
            })
        }, INTERVAL);
    }

    private reset = () => {
        this.setState({
            status: RecordStatus.TAKE,
            progress: 0
        });
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    private renderContent = () => {
        const { status } = this.state;
        switch (status) {
            case RecordStatus.RECORD:
                return this.renderRecordView();
            case RecordStatus.TAKE:
                return this.renderTakeView();
        }
    }

    private renderRecordView = () => {
        let {
            percentage,
            blankColor,
            donutColor,
            fillColor,
            progressWidth,
            size,
            children
        } = this.props;
        let half = size / 2;
        percentage = this.state.progress;
        return <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
                <Circle cx={half} cy={half} r={half} fill={blankColor} />
                <Path
                    d={`M${half} ${half} L${half} 0 ${this.generateArc(percentage, half)} Z`}
                    fill={donutColor}
                />
                {<Circle cx={half} cy={half} r={progressWidth} fill={fillColor} />}
            </Svg>
            {/* <View style={styles.textView}>
                {children}
            </View> */}
        </View>
    }

    private renderTakeView = () => {
        const {
            blankColor,
            fillColor,
            progressWidth,
            size,
        } = this.props;
        let half = size / 2;
        return <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
                <Circle cx={half} cy={half} r={half * 0.5} fill={blankColor} />
                {<Circle cx={half} cy={half} r={half * 0.4} fill={fillColor} />}
            </Svg>
        </View>
    }

    private generateArc(percentage: number, radius: number) {
        if (percentage === 100) percentage = 99.999
        const a = percentage * 2 * Math.PI / 100 // angle (in radian) depends on percentage
        const r = radius // radius of the circle
        var rx = r,
            ry = r,
            xAxisRotation = 0,
            largeArcFlag = 1,
            sweepFlag = 1,
            x = r + r * Math.sin(a),
            y = r - r * Math.cos(a)
        if (percentage <= 50) {
            largeArcFlag = 0;
        } else {
            largeArcFlag = 1
        }

        return `A${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
    }

    private changeState = (state: RecordStatus) => {
        this.setState({
            status: state,
        });
    }

    private initRecordUI = () => {
        this.allow = true;
        if (this.props.onRecording) {
            this.props.onRecording(true);
        }
    }

}

const styles = StyleSheet.create({
    textView: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    holdRecordText: {
        color: Colors.whiteLabel,
        textAlign: "center"
    },
    holdRecordContainer: {
        backgroundColor: Colors.transparent,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        resizeMode: 'cover',
        width: 65,
        height: 65,
    }
})
