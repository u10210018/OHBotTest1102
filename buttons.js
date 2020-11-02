export const Buttons = {
    data() {
        return {
            weekTag: ['M', 'T', 'W', 'T', 'F', 'S', 'S']

        }
    },
    template: `
    <div class="buttonsAll">
        <div>
            <h1 v-if="!isDayView" class="title">預約行事曆</h1>
            <div v-else class="show-date-focus">
                <span class="for-arrow" @click="plusWeek(-1)"><span class="arrow left"></span></span>
                <span class="for-time">{{returnYear(focusNow)+' / '+returnMonth(focusNow)+' / '}}{{(returnDate(focusNow)<10)?('0'+returnDate(focusNow)):returnDate(focusNow)}}</span>
                <span class="for-arrow" @click="plusWeek(1)"><span class="arrow right"></span></span>
            </div>
            <div class="view-buttons">
                <button type="button" class="select-view-button week-button" @click="setDayView">{{isDayView?'日檢視':'週檢視'}}<span class="arrow down"></span></button>
                <button type="button" class="select-view-button login-button">小莉<span class="arrow down"></span></button>
            </div>
        </div>
        <ul class="buttons-date">
            <li class="week-change">
                <span @click="setMonthShow"><i class="fa fa-calendar"></i></span> {{returnMonth(thisWeek[0].date) }}月
            </li>
            <li v-for="(v,i) in thisWeek" :class="['week-nav', 'week-nav-'+(i+1)%7, {'today': today(v.date)}]" :key="'week-nav-'+((i+1)%7)">
                <div :class="['week-tag', 'weekTag-'+v.day, {'focus': returnFocus(v.date)}]" @click="setFocusNow(v.date)">    
                    <span :class="['week-tag-day', 'weekTag-day-' + (i+1)%7]">{{v.day}}</span>
                    <span :class="['week-tag-date', 'weekTag-date-'+ returnDate(v.date)]">{{v.date | returnDate}}</span>
                </div>
            </li>
        </ul>
    </div>`,
    methods: {
        setFocusNow(date) {
            this.$store.dispatch('setFocusNow', date);
        },
        setMonthShow() {
            this.$store.dispatch('setMonthShow', true);
        },
        plusWeek(num) {
            this.$store.dispatch('setNewWeek', num);
        },
        returnFocus(day) {
            let date = new Date(day);
            let now = new Date(this.focusNow);
            if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate())
                return true;
            else return false;
        },
        today(day) {
            let date = new Date(day);
            let now = new Date();
            if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate())
                return true;
            else return false;
        },
        returnYear(day) {
            return new Date(day).getFullYear();
        },
        returnMonth(day) {
            return new Date(day).getMonth() + 1;
        },
        returnDate(day) {
            return new Date(day).getDate();
        },

        setDayView() {
            this.$store.dispatch('setDayView');
        }
    },
    computed: {
        eventList() {
            return this.$store.getters.getEventList;
        },
        thisWeek() {
            return this.$store.getters.getThisWeek;
        },
        focusNow() {
            return this.$store.getters.getFocusNow;
        },
        isDayView() {
            return this.$store.getters.getDayView;
        },
    },
    filters: {
        returnDate: function (day) {
            if (new Date(day).getDate() < 10)
                return '0' + new Date(day).getDate();
            else return new Date(day).getDate();
        },
    }
};