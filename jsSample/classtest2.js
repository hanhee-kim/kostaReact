class Clock{
    constructor({template}){    //객체를 변수로 받는다
        this.template = template;
    }

    render(){
        let date = new Date();
        // let year = date.getFullYear();
        // let month = date.getMonth()+1;  //month가 0부터 시작이므로 +1 해준다
        // let day = date.getDate();
        // if(year<10) year = '0'+year;
        // if(month<10) month = '0'+month;
        // if(day<10) day = '0'+day;
        // let output = this.template.replace('y',year).replace('m',month).replace('d',day);
        // console.log(output);

        let hour = date.getHours();
        let mins = date.getMinutes();
        let second = date.getSeconds();
        if(hour<10) hour = '0'+hour;
        if(mins<10) mins = '0'+mins;
        if(second<10) second = '0'+second;
        let output2 = this.template.replace('h',hour).replace('mi',mins).replace('s',second);
        console.log(output2);
    }

    stop(){
        clearInterval(this.timer);
    }

    start(){
        this.render();
        this.timer = setInterval(()=>this.render(),1000);
    }
}

// let clock = new Clock({template:'y-m-d'});
// clock.render();
let clock2 = new Clock({template:'h-mi-s'});
clock2.start();
setTimeout(()=>clock2.stop(),10000);