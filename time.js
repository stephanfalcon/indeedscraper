
class Time {     
    constructor(){
        this.date = new Date()

        this.year = this.date.getFullYear()
        this.month = 1+this.date.getMonth()
        this.day = this.date.getDate()

        this.days = {
            //this.date.getDay()
            1:"Monday",
            2:"Tuesday",
            3:"Wedsday",
            4:"Thursday",
            5:"Friday",
            6:"Saturday",
            7:"Sunday"
        }
        // day of the week
        this.DotW = this.days[this.date.getDay()]

        this.hours = this.date.getHours()
        this.minutes = this.date.getMinutes()
        this.seconds = this.date.getSeconds()
        this.mHours = this.date.getHours()
        this.meridiem = "am"

        this.clockHours = this.hours
        this.clockMinutes = this.minutes
        this.clockSecond = this.seconds

        if(this.hours >= 12){
            this.meridiem = "pm"
            if(this.hours>=13){
                this.hours -= 12
            }
        }


        if(this.mHours<10){
            this.mHours = `0${this.mHours}`
        }
        if(this.hours<10){
            if(this.hours == 0 ){
                this.clockHours = 12
            }else{
                this.clockHours = `0${this.hours}`
            }
        }

        if(this.minutes<10){
            this.clockMinutes = `0${this.minutes}`
        }

        if(this.seconds<10){
            this.clockSeconds = `0${this.seconds}`
        }
        
        this.military = {
            hours:this.mHours,
            minutes:this.minutes,
            seconds:this.seconds,
            meridiem:this.meridiem,
            time:`${this.mHours}:${this.minutes}:${this.seconds}` 
        }

        this.values = {
            hours:this.hours,
            minutes:this.minutes,
            seconds:this.seconds,
            meridiem:this.meridiem,
            time:`${this.hours}:${this.minutes}:${this.seconds}${this.meridiem}`
        }

        this.date = {
            day:this.day,
            month:this.month,
            year:this.year,
            dayOfWeek:this.DotW,
            calendar:`${this.month}/${this.day}/${this.year}`,
            time:this.values
        }
    }
}


module.exports = Time 

