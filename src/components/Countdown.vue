<template>
    <div class="search-bar-custom">
        <div class="search-no-bar">
            <input class="search-input" type="text" placeholder="搜尋號碼布" v-model="bibSearch" />
            <span class="search-btn">
                <i class="fa fa-search text-success cursor-pointer" @click="searchBib"></i>
            </span>
        </div>
        <button class="scan-btn">
            <img src="data:image/gif;base64,R0lGODlhHgAeAJECAC0tLY+PjwAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1zbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1zbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM3QTA1MDVEMTZDQjExRUM4QkVERkE1NkQ1RENEOTcyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM3QTA1MDVFMTZDQjExRUM4QkVERkE1NkQ1RENEOTcyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzdBMDUwNUIxNkNCMTFFQzhCRURGQTU2RDVEQ0Q5NzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzdBMDUwNUMxNkNCMTFFQzhCRURGQTU2RDVEQ0Q5NzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAACACwAAAAAHgAeAAACVZSPqcvtD2MCFLhqG6Z3sywh3ASGxiiWJnqwqyq4oWzWLYjST47DEH+zkWqBovGITBoVyqbzJYzWYL6FbFNRXKvZD7X6+0a3Yx+2g9Gk1V2p+w0/FAAAOw=="
                alt="icon" />
        </button>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const code = ref('12345');
const count = ref(5);
const counting = ref(false);
let timer;

function startCountdown() {
    if (counting.value) return;

    counting.value = true;
    count.value = 5;

    timer = setInterval(() => {
        count.value--;
        if (count.value <= 0) {
            clearInterval(timer);
            counting.value = false;
        }
    }, 1000);
}
</script>

<style scoped>
.search-bar-custom {
    width: 50%;
    margin-top: -50px;
    margin-left: auto;
    margin-right: 10px;
    position: absolute;
    right: 0px;
}

.search-input {
    padding: 10px 0px;
    font-size: 12px;
}

.scan-btn {
  padding: 4px 4px 1px 5px;
}
</style>
