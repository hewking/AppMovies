import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'

interface Props {
    percentage: number;
    blankColor: string;
    donutColor: string;
    fillColor: string;
    progressWidth: string;
    size: number;
    children: React.ReactNode;
}

export enum RecordStatus {
    TAKE = "TAKE",
    RECORD = "RECORD",
}

interface State {
    status: RecordStatus;
}

export default class CircularProgress extends Component<Props, State>{

    static defaultProps = {
        percentage: 40,
        blankColor: "#eaeaea",
        donutColor: "#43cdcf",
        fillColor: "white",
        progressWidth: 45,
        size: 100,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            status: RecordStatus.TAKE
        }
    }

    render() {
        const { status } = this.state;
        switch (status) {
            case RecordStatus.RECORD:
                return this.renderRecordView();
            case RecordStatus.TAKE:
                return this.renderTakeView();
        }
    }

    private renderRecordView = () => {
        const {
            percentage,
            blankColor,
            donutColor,
            fillColor,
            progressWidth,
            size,
            children
        } = this.props;
        let half = size / 2;
        return <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
                <Circle cx={half} cy={half} r={half} fill={blankColor} />
                <Path
                    d={`M${half} ${half} L${half} 0 ${this.generateArc(percentage, half)} Z`}
                    fill={donutColor}
                />
                {<Circle cx={half} cy={half} r={progressWidth} fill={fillColor} />}
            </Svg>
            <View style={styles.textView}>
                {children}
            </View>
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

}

const styles = StyleSheet.create({
    textView: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})