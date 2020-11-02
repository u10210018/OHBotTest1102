export const store = new Vuex.Store({
    state: {
        eventList: [{
                'title': '美甲保養',
                'member': '王小美',
                'options': '其他',
                'start': '2020-11-2 09:00:00',
                'end': '2020-11-2 10:00:00'
            },
            {
                'title': '美甲保養',
                'member': '王小美',
                'options': '其他',
                'start': '2020-11-4 14:00:00',
                'end': '2020-11-4 16:00:00'
            }, {
                'title': '美甲保養',
                'member': '王小美',
                'options': '其他',
                'start': '2020-11-8 14:00:00',
                'end': '2020-11-8 17:00:00'
            }, {
                'title': '美甲保養',
                'member': '王小美',
                'options': '其他',
                'start': '2020-11-12 13:00:00',
                'end': '2020-11-12 15:00:00'
            }
        ],
        currentDate: new Date(),
        thisWeek: [{
            'day': 'M',
            'date': 20,
        }, {
            'day': 'T',
            'date': 21,
        }, {
            'day': 'W',
            'date': 22,
        }, {
            'day': 'T',
            'date': 23,
        }, {
            'day': 'F',
            'date': 24,
        }, {
            'day': 'S',
            'date': 25,
        }, {
            'day': 'S',
            'date': 26,
        }],
        isMonthShow: false,
        isDayView: false,
        member: 'Alice',
        focusNow: new Date(),
        isReserveShow: false,
        thisMonth: new Date(),
        nextMonth: new Date(),
        weekDays1: [],
        weekDays2: []
    },
    mutations: {
        setThisWeek(state, week) {
            for (let i = 0; i < week.length; i++)
                state.thisWeek[i].date = week[i];
        },
        setFocusNow(state, date) {
            state.focusNow = new Date(date);
        },
        setMonthShow(state, bool) {
            state.isMonthShow = bool;
        },
        setDayView(state) {
            state.isDayView = !state.isDayView;
        },
        setReserveShow(state, bool) {
            state.isReserveShow = bool;
        },
        insertEventList(state, event) {
            state.eventList.push(event);
        },
        setThisMonth(state, payload) {
            for (let i = 0; i < payload.thisMonth.length; i++) {
                state.weekDays1[i] = payload.thisMonth[i];
                state.weekDays2[i] = payload.nextMonth[i];
            }
        },
        setNewMonth(state, payload) {
            state.thisMonth = new Date(payload.thisMonth);
            state.nextMonth = new Date(payload.nextMonth);
        }
    },
    actions: {
        setInitDate: ({ //設定一個日期為開始
            dispatch
        }, day) => {
            let today = new Date(day);
            dispatch('setThisWeek', today);
            dispatch('setThisMonth', today);
        },
        setNewWeek: (({ //增加或是後退一週
            dispatch,
            state
        }, go) => {
            let today = new Date(state.focusNow);
            today.setDate(today.getDate() + 7 * go);
            dispatch('setFocusNow', today);
        }),
        setThisWeek: ({ //設定本週區間
            commit,
            dispatch
        }, date) => {
            let w = date.getDay();
            let firstdayOfWeek = (w) ? date.addDays(1 - w) : date.addDays(-6);
            let week = [];
            week[0] = new Date(firstdayOfWeek);
            for (let i = 1; i < 7; i++)
                week[i] = new Date(firstdayOfWeek.addDays(1));
            commit('setThisWeek', week);
            setTimeout(() => {
                dispatch('drawEvent');
            }, 50)

        },
        setFocusNow: ({
            dispatch,
            commit
        }, date) => {
            commit('setFocusNow', date);
            dispatch('setThisWeek', date);
            dispatch('setThisMonth', date);
        },
        setMonthShow: ({ //設定月曆開關
            commit
        }, bool) => {
            commit('setMonthShow', bool);
        },
        setDayView: ({ //設定月曆開關
            commit
        }) => {
            commit('setDayView');
        },
        setReserveShow: ({ //設定月曆開關
            commit
        }, bool) => {
            commit('setReserveShow', bool);
        },
        insertEventList: ({
            commit
        }, event) => {
            commit('insertEventList', event);
        },
        setThisMonth: ({ //設定本週區間
            commit,
            dispatch,
            state
        }, date) => {
            let today = date ? date : state.focusNow;

            let y = today.getFullYear();
            let m = today.getMonth();
            let firstDay = new Date(y, m, 1);
            let firstDay2 = (m > 11.5) ? new Date(y + 1, 0, 1) : new Date(y, (m + 1), 1);
            commit('setNewMonth', {
                thisMonth: firstDay,
                nextMonth: firstDay2
            });

            let w = firstDay.getDay();
            let firstDayOfFirstWeek = (w) ? firstDay.addDays(1 - w) : firstDay.addDays(-6);
            let month = [];
            month[0] = new Date(firstDayOfFirstWeek);
            for (let i = 1; i < 42; i++)
                month[i] = new Date(firstDayOfFirstWeek.addDays(1));
            w = firstDay2.getDay();
            let firstDayOfFirstWeek2 = (w) ? firstDay2.addDays(1 - w) : firstDay2.addDays(-6);
            let month2 = [];
            month2[0] = new Date(firstDayOfFirstWeek2);
            for (let i = 1; i < 42; i++)
                month2[i] = new Date(firstDayOfFirstWeek2.addDays(1));
            commit('setThisMonth', {
                thisMonth: month,
                nextMonth: month2
            });
            dispatch('drawEvent');
        },
        drawEvent({ //設定本週區間
            dispatch,
            state
        }) {
            console.log('hi')
            document.querySelectorAll('.those_events').forEach(e => e.parentNode.removeChild(e));
            for (let i = 0; i < state.eventList.length; i++) {
                let {
                    title,
                    member,
                    start,
                    end
                } = state.eventList[i];
                let dateStart = new Date(start).getFullYear() + '-' + (new Date(start).getMonth() + 1) + '-' + (new Date(start).getDate());
                let timeStart = new Date(start).getHours();
                let timeEnd = new Date(end).getHours();

                let timeLength = timeEnd - timeStart;
                let span;
                for (let i = 0; i < timeLength; i++) {
                    span = document.querySelector(`.week-day-${dateStart}.time-row-${timeStart+i}`);
                    if (span) {
                        if (i == 0 && timeLength == 1) span.innerHTML = `<span class="those_events" style="border-radius: 10px;">${title}</span>`
                        else if (i == 0 && timeLength > 1) span.innerHTML = `<span class="those_events" style="border-radius: 10px 10px 0 0;">${title}</span>`
                        else if (i == timeLength - 1) span.innerHTML = `<span class="those_events"  style="border-radius: 0 0 10px 10px;"></span>`
                        else span.innerHTML = `<span class="those_events"  style="border-radius: 0;"></span>`;
                    }
                }
            }
            dispatch('drawNow');
        },
        drawNow() {
            let dateStart = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate());
            let timeStart = new Date().getHours();
            let transX = new Date().getMinutes();
            let span = document.querySelector(`.week-day-${dateStart}.time-row-${timeStart}`);
            if (span) {
                span.innerHTML = span.innerHTML + `<span class="now those_events" style="transform:translate(0,${transX}px)"></span>`;

            }
        }
    },
    getters: {
        getEventList: (state) => {
            return state.eventList;
        },
        getThisWeek: (state) => {
            return state.thisWeek;
        },
        getFocusNow: (state) => {
            return state.focusNow;
        },
        getDayView: (state) => {
            return state.isDayView;
        },
        getReserveShow: (state) => {
            return state.isReserveShow;
        },
        getMonthShow: (state) => {
            return state.isMonthShow;
        },
        getWeekDays1: (state) => {
            return state.weekDays1;
        },
        getWeekDays2: (state) => {
            return state.weekDays2;
        },
        getThisMonth: (state) => {
            return state.thisMonth;
        },
        getNextMonth: (state) => {
            return state.nextMonth;
        }
    },

});