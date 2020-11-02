export const ReserveView = {
    template: `
<div class="reserveAll">
    <form>
        <button type="button" class="close-btn" @click="setReserveShow(false)"></button>
        <table class="demo">
            <thead>
                <tr>
                    <th colspan="2">預約新增</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><label for="title">預約項目 :</label></td>
                    <td><input type="text" id="title" required v-model="title" placeholder="服務項目"></td>
                </tr>
                <tr>
                    <td><label for="guestName">預約客人 :</label></td>
                    <td><input type="text" id="guestName" v-model="guestName" placeholder="客戶名稱"></td>
                </tr>
                <tr>
                    <td><label for="options">備註 :</label></td>
                    <td><input type="text" id="options" v-model="options" placeholder="其他須知"></td>
                    </tr>
                <tr>
                    <td><label for="selectDate">日期 :</label></td>
                    <td><input type="date" id="selectDate" name="selectDate" value="2020-11-01" required v-model="selectDate"></td>
                </tr>
                <tr>
                    <td><label for="timeStart">開始時間 :</label></td>
                    <td> 
                        <select id="timeStart" required v-model="timeStart">
                            <option value="" disabled>開始時間</option>
                            <option value="0">00:00am</option>
                            <option v-for="i in 12" :value="i">{{((i<10)?'0':'')+i+':00am'}}</option>
                            <option v-for="i in 11" :value="i+12">{{((i<10)?'0':'')+i+':00pm'}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="timeEnd">結束時間 :</label></td>
                    <td>
                        <select id="timeEnd" required v-model="timeEnd">
                            <option value="" disabled>結束時間</option>
                            <option value="0">00:00am</option>
                            <option v-for="i in 12" :value="i">{{((i<10)?'0':'')+i+':00am'}}</option>
                            <option v-for="i in 11" :value="i+12">{{((i<10)?'0':'')+i+':00pm'}}</option>
                        </select>
                        {{error ? '結束時間錯誤' : ''}}
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><button type="button" @click="insertEvent">新增</button></td>
                </tr>
            </tbody>
        </table>
    </form>
</div>
   `,
    data: function () {
        return {
            title: '',
            guestName: '',
            options: '',
            selectDate: '',
            timeStart: '',
            timeEnd: '',
            error: false
        }
    },
    methods: {
        setReserveShow(bool) {
            this.$store.dispatch('setReserveShow', bool);
        },
        insertEvent() {
            if (this.title && this.guestName && this.selectDate && this.timeStart && this.timeEnd && !this.error) {
                this.$store.dispatch('insertEventList', {
                    'title': this.title,
                    'member': this.guestName,
                    'options': this.options,
                    'start': new Date(this.selectDate + ' ' + this.timeStart + ':00:00'),
                    'end': new Date(this.selectDate + ' ' + this.timeEnd + ':00:00'),
                });
                this.setReserveShow(false);
            } else {
                alert('尚有資料錯誤');
            }
        },
    },
    computed: {
        focusNow() {
            return this.$store.getters.getFocusNow;
        },
    },
    watch: {
        timeEnd: function () {
            if (this.timeStart)
                this.error = this.timeEnd <= this.timeStart ? true : false;
        },
    }
}