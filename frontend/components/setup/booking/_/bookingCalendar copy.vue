<template>
<div>
	<div class="wrap">
	<div id="app">
		<h1>CALENDAR</h1>
		<div class="calendar">
<!-- 2020 10 -->
			<div class="calendar__header">
				<a href="javascript:;" class="arrow-btn btn-prevmonth" @click.prevent="changeMonth(false)">Prev</a>
				<div class="calendar__title" @click.prevent="backToToday()">
					<span class="caption-year">{{current.year}} 년</span>
					<span class="caption-month">{{convertTwoDigits}} 월</span>
				</div>
				<a href="javascript:;" class="arrow-btn btn-nextmonth" @click.prevent="changeMonth(true)">Next</a>
			</div>

<!-- MON TUE WED THU FRI SAT SUN -->
			<div class="calendar__body">
				<ul class="calendar__heading">
					<li v-for="(item, index) in heading" :key='index'>
						<div class="calendar__item">{{item}}</div>
					</li>
				</ul>
<!-- 1 2 3 4 5 ... 31 -->

				<ul class="calendar__content">
					<li v-for="(item, index) in buildCalendar" :key='index'>
						<a href="javascript:;" class="calendar__item" 
						:class="{'is-today': item.today === true, 'current': item.current === true}" 
						@click.prevent="getDateData(item)">{{item.number}}</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="todolist">
			<div class="todolist__header">
				<span class="caption-year">{{current.year}}년</span>
				<span class="caption-month">{{current.month}}월</span>
				<span class="caption-date">{{current.date}}일</span>
			</div>
			<div class="todolist__body"></div>
		</div>
	</div>
</div>
<div>
	{{moment}}
</div>
</div>
</template>

<script>
import moment from 'moment'

export default {
data() {
	return {
	text: 'wwww',
	current: {
				year: 0,
				month: 0,
				date: 0
			},
	today: {
				year: 0,
				month: 0,
				date: 0
	},
	heading: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],

	}
},
methods: {
	// ..
	// moment() {
	// this.text = moment()
	// 	.toDate()
	// 	.toLocaleTimeString()
	// },
	changeMonth(isNext) {
				let month = this.current.month;
				isNext === true ? (month = month + 1) : (month = month - 1);
				if (month <= 0) {
					month = 12;
					this.current.year = this.current.year - 1;
				}
				if (month > 12) {
					month = 1;
					this.current.year = this.current.year + 1;
				}
				this.current.month = month;
				this.current.date = 1;
			},
			getDateData(data) {
				if (data.none === true) {
					return false;
				} else {
					if (
						data.years === this.current.year &&
						data.month === this.current.month &&
						data.date === this.current.date
					) {
						return false;
					} else {
						this.current.year = data.years;
						this.current.month = data.month;
						this.current.date = data.date;
					}
				}
			},
			backToToday() {
				this.current.year = this.today.year;
				this.current.month = this.today.month;
				this.current.date = this.today.date;
			},
			getToday() {
				this.today.year = moment().year();
				this.today.month = moment().month() + 1;
				this.today.date = moment().date();
			}
},

	computed: {
		moment(){
		var time = moment('2020-10').format("d");
			return time

		},
			buildCalendar() {
				// 현재날짜
				let myYears = this.current.year;
				let myMonth = this.current.month;
				let myDate = this.current.date;

				// Month를  01 02 로 만들기 위해서
				let monthText = "";
				myMonth < 10 ? (monthText = `0${myMonth}`) 	: (monthText = myMonth.toString());


				let dateArray = [];
				let patchNum = 0;

				// 이 달의 총 일수를 구하기 위해 (2월은 29일, 3월은 31일)
				let totalDate = moment(`${myYears}-${monthText}`).daysInMonth();

				// 요일 구하기 'd'는 1234,  'ddd'는 Mon Tue Wed  'dddd' 는 Monday Tudesday
				let week = moment(`${myYears}-${monthText}`).format("d");

				// 클릭한 달의 총 일수를 구하기, 현재날짜(isToday)와 선택한 날짜(isCurrent)
				for (let i = 0; i < totalDate; i++) {
					let dateNum = i + 1;
					let isToday = false;
					let isCurrent = false;
					let dateText = "";

				// 오늘날짜와 
					if (
						myYears === this.today.year &&
						myMonth === this.today.month &&
						dateNum === this.today.date
					) {
						isToday = true;
					}

					if (dateNum === myDate) {
						isCurrent = true;
					}

					dateNum < 10
						? (dateText = `0${dateNum}`)
						: (dateText = dateNum.toString());

					let obj = {
						years: myYears,
						month: myMonth,
						date: dateNum,
						number: dateText,
						today: isToday,
						current: isCurrent
					};
					dateArray.push(obj);
					console.log(obj)
				}

				// splice를 이용해서 맨 처음 array에 추가, Week Count   obj.non.lengt
				for (let i = 0; i < week; i++) {
					let obj = {
						number: "",
						none: true
					};
					dateArray.splice(i, 0, obj);
				}

				// splice를 이용해서 맨 이후 array에 추가,
				dateArray.length % 7 === 0
					? (patchNum = 0)
					: (patchNum = 7 - dateArray.length % 7);

				for (let i = 0; i < patchNum; i++) {
					let obj = {
						number: "",
						none: true
					};
					dateArray.splice(dateArray.length, 0, obj);
					
				}
				return dateArray;
				console.log('third', dateArray)
			},

			convertTwoDigits() {
				let text = "";
				this.current.month < 10
					? (text = `0${this.current.month}`)
					: (text = this.current.month);
				return text;
			}
		},
created() {
	this.getToday();
	this.backToToday();
},
}
</script>











<style lang="scss" >
// 2020 10 맨윗쪽
$color-gray-default: #E5E5E5;   

// calendar font color
$color-black: black;
// calendar background color
$color-white: #fff;

// mon tue wed
$color-gray: #fff;


/* Base */
body {
    font-size: 16px;
    line-height: 1.4em;
    letter-spacing: 0.5px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    background-color: $color-black;
    color: $color-black;
}

ul {
    list-style: none;
}

a {
    text-decoration: none;
}

p {
    margin-bottom: 1em;
}

* {
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif !important;
}

h1{
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2em;
    margin: 1rem 0px;
    color: $color-white;
    text-align: center;
}

/* Wrap */
.wrap {
    width: calc(100% - 20px);
    max-width: 420px;
    margin: auto;
}

/* Calendar */
.calendar{
    margin: 1rem 0px;
    overflow: hidden;
    border-radius: 7px;
}

.calendar__heading,
.calendar__content{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > li{
        width: 14.285%;
    }
}

.calendar__item{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px 0px;
    border-radius: 3px;
    transition: all 0.3s;
    color: $color-black;
    &.current{
        background-color: $color-gray-default;
    }
    &.is-today{
        background-color: $color-black;
        color: $color-white;
    }
}

.calendar__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    background-color: $color-gray-default;
    .arrow-btn{
        display: flex;
        font-size: 0rem;
        &::before{
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
        }
        &.btn-prevmonth::before{
            border-width: 10px 13px 10px 0;
            border-color: transparent $color-black transparent transparent;
        }
        &.btn-nextmonth::before{
            border-width: 10px 0 10px 13px;
            border-color: transparent transparent transparent $color-black;
        }
    }
}

.calendar__title{
    text-align: center;
    font-size: 1.3rem;
    cursor: pointer;
}

.calendar__heading{
    padding: 0px 5px;
    background-color: $color-gray;
    .calendar__item{
        color: $color-black;
    }
}

.calendar__content{
    padding: 5px;
    position: relative;
    background-color: $color-white;
    .calendar__item{
        font-size: 1.3rem;
        cursor: pointer;
    }
}

/* Todolist */
.todolist{
    margin: 1rem 0px;
    overflow: hidden;
    border-radius: 7px;
    background-color: $color-white;
}

.todolist__header{
    font-size: 1.5rem;
    padding: 10px 15px;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>