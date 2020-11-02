Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
}

import {
    app
} from "./app.js";
import {
    store
} from "./store.js";


new Vue({
    store,
    render: h => h(app)
}).$mount('#app')