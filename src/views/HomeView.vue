<template>
    <div class="app-content" :style="backgroundStyle">
        <div class="Search">
            <img data-v-48a13218="" width="150"
                src="https://www.soonnetmall.com/img/LOGO%E6%A8%99%E6%BA%96%E8%A6%8F%E7%AF%84_LOGO%EF%BC%8B%E4%B8%AD%E8%8B%B1%E6%96%87%E5%AD%97-%E7%99%BD_3x1.DVnl3YHw.png"
                alt="LOGO" style="margin-bottom: 30px; cursor: pointer;">
            <div class="search-bar">
                <div class="el-autocomplete h-64px">
                    <div class="el-input el-input--large el-input--suffix">
                        <div class="el-input__wrapper">
                            <input class="search-input" type="text" placeholder="請選擇活動" v-model="activitySearch"
                                @focus="showDropdown = true" @input="showDropdown = true" @blur="onBlur"
                                @keydown.down.prevent="moveDown" @keydown.up.prevent="moveUp"
                                @keydown.enter.prevent="selectActive" />
                            <span class="search-btn">
                                <i class="fa fa-search text-success cursor-pointer" @click="searchActivity"></i>
                            </span>
                        </div>
                    </div>
                    <ul v-if="showDropdown && filteredActivities.length" class="activity-dropdown">
                        <li v-for="(item, idx) in filteredActivities" :key="item.id"
                            :class="['event-search', { active: idx === activeIndex }]"
                            @mousedown.prevent="selectActivity(item)" @mouseover="activeIndex = idx">
                            <span class="activity-date">活動日期: {{ item.date }}</span>
                            <span class="activity-name">{{ item.name }}</span>
                        </li>
                    </ul>
                </div>
            </div>

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
        </div>
        <footer-menu></footer-menu>
    </div>
</template>

<script>
import activities from '../data/activities.js'
import AppHeader from '../components/AppHeader.vue';
import FooterMenu from '../components/FooterMenu.vue';
import { useRouter } from 'vue-router';

export default {
    name: 'SearchBar',
    components: { AppHeader, FooterMenu },
    data() {
        return {
            activitySearch: '',
            bibSearch: '',
            showDropdown: false,
            activeIndex: -1,
            activities,
            selectedActivity: null,
            bgImages: [
                'https://apimall.soonnetmall.com/IndexBanner/2/3e5bfe01-02dd-48e6-8e6b-547b65b6d574/LokVPoster_P.jpg',
                'https://apimall.soonnetmall.com/IndexBanner/2/e7ecff42-18dd-442a-9ea9-aeb662985f26/LokVPoster_P.jpg',
                'https://apimall.soonnetmall.com/IndexBanner/2/2b63a4fc-cb20-4ed8-9d37-84b86ebf1dca/LokVPoster_P.jpg'
            ],
            bgIndex: 0,
            bgInterval: null
        };
    },
    computed: {
        filteredActivities() {
            if (!this.activitySearch) return this.activities;
            return this.activities.filter(a =>
                a.name.includes(this.activitySearch)
            );
        },
        backgroundStyle() {
            return {
                backgroundImage: `linear-gradient(#000000b3, #000000b3), url(${this.bgImages[this.bgIndex]})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100%',
                width: '100%',
                position: 'absolute',
                zIndex: 0
            };
        }
    },
    mounted() {
        this.bgInterval = setInterval(() => {
            this.bgIndex = (this.bgIndex + 1) % this.bgImages.length;
        }, 4000);
    },
    beforeUnmount() {
        clearInterval(this.bgInterval);
    },
    methods: {
        searchActivity() {
            // 修正：先關閉下拉選單，確保 search-btn 可點擊
            this.showDropdown = false;
            const activity = this.selectedActivity ||
                this.activities.find(a => a.name === this.activitySearch);
            if (activity) {
                this.$router.push({ name: 'EventPhoto', params: { id: activity.id } });
            }
        },
        searchBib() {
            // 搜尋號碼布邏輯
            console.log('搜尋號碼布:', this.bibSearch);
        },
        selectActivity(item) {
            this.activitySearch = item.name;
            this.selectedActivity = item;
            // 不要即時關閉下拉選單，讓 search-btn 可點擊
            // this.showDropdown = false;
        },
        onBlur() {
            // 延遲關閉，否則點擊 search-btn 會搶先觸發
            setTimeout(() => {
                this.showDropdown = false;
            }, 200);
        },
        moveDown() {
            if (this.activeIndex < this.filteredActivities.length - 1) {
                this.activeIndex++;
            }
        },
        moveUp() {
            if (this.activeIndex > 0) {
                this.activeIndex--;
            }
        },
        selectActive() {
            if (this.activeIndex >= 0 && this.activeIndex < this.filteredActivities.length) {
                this.selectActivity(this.filteredActivities[this.activeIndex]);
            }
        }
    }
};
</script>

<style scoped></style>
