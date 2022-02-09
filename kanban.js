today_list = [
]

tommorow_list = [
]

thisweek_list = [
]

nextweek_list = [
]

later_list = [
]

if(!localStorage.getItem('getToday')) {
    today_list = [];
} else {
    today_list = localStorage.getItem('getToday').split(',')
}

if(!localStorage.getItem('getTommorow')) {
    tommorow_list = [];
} else {
    tommorow_list = localStorage.getItem('getTommorow').split(',');
}

if(!localStorage.getItem('getThisweek')) {
    thisweek_list = [];
} else {
    thisweek_list = localStorage.getItem('getThisweek').split(',');
}

if(!localStorage.getItem('getNextweek')) {
    nextweek_list = [];
} else {
    nextweek_list = localStorage.getItem('getNextweek').split(',');
}

if(!localStorage.getItem('getLater')) {
    later_list = [];
} else {
    later_list = localStorage.getItem('getLater').split(',');
}

console.log(today_list)

lists = [
    today_list,
    tommorow_list,
    thisweek_list,
    nextweek_list,
    later_list
]

places = [
    "today",
    "tommorow",
    "thisweek",
    "nextweek",
    "later"
]

function makeevent(text) {
    html_code = "<div class=\"event\"><p class=\"event_text\">"+text+"</p><div class=\"close_button\"><i class=\"fas fa-times-circle\"></i></div></div>"
    return html_code
}

function makehtml() {
    for(let i = 0; i < lists.length; i++) {
        html_code = ""
        for( let j = 0; j < lists[i].length; j++) {
            html_code += makeevent(lists[i][j])
        }
        html_code += "<div class=\"add_button\"><i class=\"fas fa-plus\"></i></div>"
        element = document.getElementById(places[i])
        element.innerHTML = html_code
        now = new Date()
        year = now.getFullYear()
        month = now.getMonth()
        date = now.getDate();
        day = now.getDay()
        weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        today = `${year}/${month}/${date}（${weekday[day]}）`   
        dateElement = document.getElementById("date")
        dateElement.innerHTML = today
    }
}

event_text = ""

function repeat(){
    $('.event').draggable({
        //本当は、clone出せばいいだけなんだけどね〜
        start: function(){
            $(this).hide();
            parent = $(this).parent()
            event_text = this.textContent
            parent_id = parent.attr('id')
            delete_index = places.indexOf(parent_id);
            new_index = lists[delete_index].indexOf(event_text)
            lists[delete_index].splice( new_index, 1 );
            console.log(this.textContent) 
        }
    })
    $(".draggable").droppable({
        //ドロップOKの要素を指定
        accept :".event" ,
        //ドロップ時の動作
        drop : function(){
            console.log("fuck!!")
            console.log(this)
            id = $(this).attr('id')
            console.log(id)
            index = places.indexOf(id);
            lists[index].push(event_text)
            makehtml()
            repeat()
        }
    })

    $('.close_button').click(function() {
        console.log(this)
        parent = $(this).parent()
        delete_event_txt = parent[0].textContent
        id = $(this).parent().parent().attr('id')
        index = places.indexOf(id);
        second_index = lists[index].indexOf(delete_event_txt)
        lists[index].splice( second_index, 1 );
        localStorage.setItem('getToday',today_list);
        localStorage.setItem('getTommorow',tommorow_list);
        localStorage.setItem('getThisweek',thisweek_list);
        localStorage.setItem('getNextweek',nextweek_list);
        localStorage.setItem('getLater',later_list);
        makehtml()
        repeat()
    })
    $('.add_button').click(function() {
        parent = $(this).parent()
        id = $(parent).attr('id')
        console.log(id)
        index = places.indexOf(id);
        $(this).css("opacity", "0")
        //inputを表示するコード
        place = "#"+id
        add_code = "<div class=\"input_container\"><input type=\"text\" id=\"task\" placeholder=\"タスクを追加\"><label>＋</label></div>"
        console.log("挿入しました")
        $(add_code).appendTo(place);
        $('input').focus();
        $('label').click(function() {
            new_task = document.getElementById("task").value
            lists[index].push(new_task)
            localStorage.setItem('getToday',today_list);
            localStorage.setItem('getTommorow',tommorow_list);
            localStorage.setItem('getThisweek',thisweek_list);
            localStorage.setItem('getNextweek',nextweek_list);
            localStorage.setItem('getLater',later_list);
            console.log("保存しました")
            console.log(today_list)
            makehtml()
            repeat()
        })
        $("#task").keypress(function(e){
            if(e.which == 13){
                $('label').click();
            }
        })
    })
}

$(function() {
    repeat()
})

makehtml()

