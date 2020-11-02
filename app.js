import {
    Buttons
} from "./buttons.js";
import {
    WeekView
} from "./week.js";
import {
    MonthView
} from "./month.js";
import {
    ReserveView
} from "./reserve.js";

export const app = {
    components: {
        Buttons,
        WeekView,
        MonthView,
        ReserveView
    },
    template: `
    <main>
       <buttons v-if="!isMonthShow"></buttons>
       <month-view v-if="isMonthShow"></month-view>
       <week-view v-else></week-view>
       <reserve-view v-if="isReserveShow"></reserve-view>
    </main>`,
    mounted() {
        this.$store.dispatch('setInitDate', new Date());
        this.$nextTick(function () {
            this.drawEvent();
        })

    },
    updated() {
        this.drawEvent();
    },
    computed: {
        isReserveShow() {
            return this.$store.getters.getReserveShow;
        },
        isMonthShow() {
            return this.$store.getters.getMonthShow;
        }
    },
    methods: {
        drawEvent() {
            for (let i = 0; i < this.$store.state.eventList.length; i++) {
                let {
                    title,
                    member,
                    start,
                    end
                } = this.$store.state.eventList[i];
                let dateStart = new Date(start).getFullYear() + '-' + (new Date(start).getMonth() + 1) + '-' + (new Date(start).getDate());
                let timeStart = new Date(start).getHours();
                let timeEnd = new Date(end).getHours();

                let timeLength = timeEnd - timeStart;
                let span;
                for (let i = 0; i < timeLength; i++) {
                    span = document.querySelector(`.week-day-${dateStart}.time-row-${timeStart+i}`);
                    if (span) {
                        if (i == 0 && timeLength == 1) span.innerHTML = `<span style="border-radius: 10px;">${title}</span>`
                        else if (i == 0 && timeLength > 1) span.innerHTML = `<span style="border-radius: 10px 10px 0 0;">${title}</span>`
                        else if (i == timeLength - 1) span.innerHTML = `<span style="border-radius: 0 0 10px 10px;"></span>`
                        else span.innerHTML = `<span style="border-radius: 0;"></span>`;
                    }
                }
            }
            this.drawNow();
        },
        drawNow() {
            let dateStart = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate());
            let timeStart = new Date().getHours();
            let transX = new Date().getMinutes();
            let span = document.querySelector(`.week-day-${dateStart}.time-row-${timeStart}`);
            if (span) {
                span.innerHTML = span.innerHTML + `<span class="now" style="transform:translate(0,${transX}px)"></span>`;

            }
        }
    }
}