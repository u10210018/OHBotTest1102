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
            this.$store.dispatch('drawEvent');
        })

    },
    updated() {
        this.$store.dispatch('drawEvent');
    },
    computed: {
        isReserveShow() {
            return this.$store.getters.getReserveShow;
        },
        isMonthShow() {
            return this.$store.getters.getMonthShow;
        }
    },
    methods: {}
}