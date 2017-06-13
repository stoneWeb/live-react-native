import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

interface IPropsInterface {
    date: Date;
    days?: Array<string>;
    months?: Array<string>;
    style?: any;
    nextMonthPress?: () => void;
    prevMonthPress?: () => void;
    selectPress?: (date: Date) => void;
}
const noop = () => {};

const styles = StyleSheet.create({
    calendar: {
        backgroundColor: 'white'
    },

    week: {
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    dayOuter: {
        flex: 1,
    },

    dayInner: {
        paddingVertical: 12,
        paddingHorizontal: 8,
    },

    todayDayInner: {
        backgroundColor: 'rgba(86, 65, 197, .5)'
    },

    dayText: {
        color: '#333',
        textAlign: 'center',
    },

    emptyDayText: {
        textAlign: 'center',
        color: '#aaa'
    },

    dayWeekendText: {
        color: '#BF360C',
    },

    bar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4
    },

    todayView: {
        backgroundColor: '#6A3FC7',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 5
    },

    todayViewWeek: {
        color: 'white',
        fontSize: 24
    },

    todayViewDay: {
        color: 'white',
        fontSize: 160,
        fontWeight: '100'
    },

    barText: {
        fontSize: 24,
        color: '#333',
        fontWeight: '400'
    },

    weekDay: {
        color: '#333',
        textAlign: 'center',
        fontWeight: '500'
    },

    todayLine: {
        backgroundColor: 'rgba(86, 65, 197, .1)'
    },

    barButton: {
        backgroundColor: 'white',
        padding: 10,
    },

    schadedText: {
        color: '#AAAAAA',
    }
}) as any;

export default class Calender extends React.Component<IPropsInterface, any> {
    constructor(props: IPropsInterface) {
        super(props);
    }

    static defaultProps = {
        date: new Date,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months: [
                'January', 'February', 'March',
                'April',   'May',      'June',
                'July',    'August',   'September',
                'October', 'November', 'December'
            ],
        style: {},
        nextMonthPress: noop,
        prevMonthPress: noop,
        selectPress: noop
    } as IPropsInterface;

    _getDate(day: number): Date {
        const d = new Date(this.props.date.getTime());
        d.setDate(day);
        return d;
    }
    _getDay(day: number) {
        const d = new Date(this.props.date.getTime());
        d.setDate(day);
        return d.getDate();
    }
    _renderCalendarDay(index: number, day: number, todayLine: (isToday: boolean) => void) {
        const weekDay = index % 7;
        // const isWeekend = weekDay === 0 || weekDay  === 6;

        const today = new Date();
        const isToday = this.props.date.getDate() === day &&
                        this.props.date.getMonth() === today.getMonth() &&
                        this.props.date.getFullYear() === today.getFullYear();

        todayLine(isToday);
        return (
            <View key={day} style={styles.dayOuter}>
                <TouchableOpacity onPress={() => this.props.selectPress(this._getDate(day))}>
                    <View style={[styles.dayInner, isToday ? styles.todayDayInner : {}]}>
                        <Text style={styles.dayText}>
                            {day}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _renderCalendarDayEmpty(emptyDay: number) {
        return (
            <View key={emptyDay} style={styles.dayOuter}>
                <View style={styles.dayInner}>
                    <Text style={styles.emptyDayText}>{this._getDay(emptyDay)}</Text>
                </View>
            </View>
        );
    }

    _renderCalendarWeek(start: number, firstDay: number, daysInMonth: number) {
        const days = [];
        const weekKey = start;
        let isTodayLine: boolean = false;

        for (let i = 0; i < firstDay; i++) {
            days.push(this._renderCalendarDayEmpty(-firstDay + 1 + i));
        }

        let i = firstDay;
        for (; i < 7 && daysInMonth > 0; i++) {
            days.push(this._renderCalendarDay(i, start++, (today) => { isTodayLine = today; }));
            daysInMonth--;
        }

        for (; i < 7; i++) {
            days.push(this._renderCalendarDayEmpty(start++));
        }

        return (
            <View key={weekKey} style={[styles.week, isTodayLine ? styles.todayLine : null]}>
                {days}
            </View>
        );
    }

    _renderHeader() {
        const month = this.props.date.getMonth();
        const year = this.props.date.getFullYear();
        const monthName = this.props.months[month];

        const { nextMonthPress, prevMonthPress } = this.props;

        return (
            <View style={styles.bar}>
                <TouchableOpacity style={styles.barTouchable} onPress={() => prevMonthPress()}>
                    <View style={[styles.barButton, styles.barButtonPrev]}>
                        <Text>
                            &larr;
                        </Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={styles.barText}>
                        {monthName + ', ' + year}
                    </Text>
                </View>

                <TouchableOpacity style={styles.barTouchable} onPress={() => nextMonthPress()}>
                    <View style={[styles.barButton, styles.barButtonNext]}>
                        <Text>
                            &rarr;
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _renderDays() {
        const elements = [];

        for (let i = 0; i < 7; i++) {
            const dayIndex = i % 7;
            elements.push(
                <View key={i} style={styles.dayInner}>
                    <Text style={[styles.weekDay]}>
                        {this.props.days[dayIndex].slice(0, 3)}
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.week}>
                {elements}
            </View>
        );
    }

    _renderToday() {
        const date = new Date();
        const weekDay = date.getDay(), day = date.getDate();

        return <View style={styles.todayView}>
                    <Text style={styles.todayViewWeek}>{this.props.days[weekDay]}</Text>
                    <Text style={styles.todayViewDay}>{day}</Text>
                </View>;
    }

    render() {
        const { date, style } = this.props;
        let monthFirstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        // monthFirstDayOfWeek = (monthFirstDayOfWeek - 7) % 7;
        let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let startDateNumber = 1, lines = 5;

        const weeks = [];
        if (monthFirstDayOfWeek !== 0) {
            weeks.push(this._renderCalendarWeek(startDateNumber, monthFirstDayOfWeek, daysInMonth));
            daysInMonth     -= (7 - monthFirstDayOfWeek) % 7;
            startDateNumber += (7 - monthFirstDayOfWeek) % 7;
        }
        
        while (lines > 0) {
            weeks.push(this._renderCalendarWeek(startDateNumber, 0, daysInMonth));
            startDateNumber += 7;
            daysInMonth     -= 7;
            lines--;
        }

        return <View style={[styles.calendar, style]}>
                    {this._renderToday()}
                    {this._renderHeader()}
                    {this._renderDays()}
                    {weeks}
                </View>;
    }
}