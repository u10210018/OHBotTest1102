export const MonthView = {
    template: `
    <div class="monthAll">
        <div class="buttons">
            <button type="button" class="close-btn" @click="setMonthShow(false)"></button>
            <div class="title-top">
                <span class="calendar"><i class="fa fa-calendar"></i></span>
                <h1 class="title">選擇日期</h1>
            </div>
            <h2 class="monthNow">{{returnYear(thisMonth)}} / {{returnMonth(thisMonth)+1}}</h2>
            <ul>
                <li v-for="(v,i) in weekTag" :class="['week-nav', 'week-nav-'+(i+1)%7]" :key="'week-nav-'+((i+1)%7)">
                    <div :class="['week-tag', 'weekTag-'+v]">    
                        <span :class="['week-tag-day', 'weekTag-day-' + (i+1)%7]">{{v}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="months">
            <div  class="month">
                <table>
                    <tbody>
                        <tr v-for="i in 6">
                            <td v-for="(v,j) in weekDays1.slice(-7+i*7, 0+i*7)" 
                                :class="[{'not-this-week':(returnMonth(v) !== returnMonth(thisMonth))},{'today':today(v)},{'myFocus': returnMyFocus(v)}]"
                                @click="setMyFocusNow(v)">
                                <span :title="returnYear(v)+' / '+(returnMonth(v)+1)+' / '+returnDate(v)">{{returnDate(v)}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div  class="month">
                <h2 class="monthNow">{{returnYear(nextMonth)}} / {{returnMonth(nextMonth)+1}}</h2>
                <table>
                    <tbody>
                        <tr v-for="i in 6">
                            <td v-for="(v,j) in weekDays2.slice(-7+i*7, 0+i*7)" 
                                :class="[{'not-this-week':(returnMonth(v) !== returnMonth(nextMonth))},{'today':today(v)},{'myFocus': returnMyFocus(v)}]"
                                @click="setMyFocusNow(v)">
                                <span :title="returnYear(v)+' / '+(returnMonth(v)+1)+' / '+returnDate(v)">{{returnDate(v)}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="select-btn" type="button" @click="setFocusNow">選擇</button>
        </div>
    </div>`,
    data() {
        return {
            weekTag: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            myFocusNow: new Date(),
        }
    },
    methods: {
        setMonthShow(bool) {
            this.$store.dispatch('setMonthShow', bool);
        },
        setMyFocusNow(date) {
            this.myFocusNow = new Date(date);
        },
        setFocusNow() {
            this.$store.dispatch('setFocusNow', this.myFocusNow);
            this.setMonthShow(false);
        },
        returnMyFocus(day) {
            let date = new Date(day);
            let now = new Date(this.myFocusNow);
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
        focusNow() {
            return this.$store.getters.getFocusNow;
        },
        weekDays1() {
            return this.$store.getters.getWeekDays1;
        },
        weekDays2() {
            return this.$store.getters.getWeekDays2;
        },
        thisMonth() {
            return this.$store.getters.getThisMonth;
        },
        nextMonth() {
            return this.$store.getters.getNextMonth;
        },
    },
};