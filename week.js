export const WeekView = {
    template: `
    <ul class="weekAll">
        <li class="week-column time-column">
            <ul>
                <li class="tr time-column-0">00:00am</li>
                <li v-for="i in 12" :class="['tr', 'time-column-'+i]" :key="i+'am'">{{((i<10)?'0':'')+i+':00am'}}</li>
                <li v-for="i in 12" :class="['tr', 'time-column-'+(i+12)]" :key="i+'pm'">{{((i<10)?'0':'')+i+':00pm'}}</li>
            </ul>
        </li>
        <li v-for="(v,i) in thisWeek" :class="['week-column', 'week-main', 'week-column-'+(i%7), {'with-day-view': isDayView}, {'this-show-all': returnFocus(v.date)}]" :key="'week-column-day'+i">
            <ul>
                <li class="td time-row-0"></li>
                <li v-for="j in 12" :class="['td', 'week-day-'+returnYear(v.date)+'-'+(returnMonth(v.date)+1)+'-'+returnDate(v.date), 'time-row-'+(j-1)]" :key="j+'am'"></li>
                <li v-for="j in 12" :class="['td', 'week-day-'+returnYear(v.date)+'-'+(returnMonth(v.date)+1)+'-'+returnDate(v.date), 'time-row-'+(j+11)]" :key="j+'pm'"></li>
            </ul>
        </li>

        <button class="insert-btn" type="button" @click="setReserveShow(true)">+ 新增預約</button>
    </ul>`,
    methods: {
        returnFocus(day) {
            let date = new Date(day);
            let now = new Date(this.focusNow);

            if (this.isDayView && now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate())
                return true;
            else return false;
        },
        setReserveShow(bool) {
            this.$store.dispatch('setReserveShow', bool);
        },
        returnYear(day) {
            let date = new Date(day);
            return date.getFullYear();
        },
        returnMonth(day) {
            let date = new Date(day);
            return date.getMonth();
        },
        returnDate(day) {
            let date = new Date(day);
            return date.getDate();
        },
    },
    computed: {
        eventList() {
            return this.$store.getters.getEventList;
        },
        isDayView() {
            return this.$store.getters.getDayView;
        },
        focusNow() {
            return this.$store.getters.getFocusNow;
        },
        thisWeek() {
            return this.$store.getters.getThisWeek;
        },
    },
};