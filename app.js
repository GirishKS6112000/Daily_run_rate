$(function() {
    var selectedDates = [];

    $("#datepicker").datepicker({
      dateFormat: 'dd/mm/yy',
      onSelect: function(dateText) {
        var date = $(this).datepicker('getDate');
        if (!isDateSelected(date)) {
          selectedDates.push(date);
        } else {
          selectedDates = selectedDates.filter(function(selectedDate) {
            return !isSameDate(selectedDate, date);
          });
        }
        updateSelectedDatesInput();
      }
    });

    function isSameDate(date1, date2) {
      return date1.getDate() === date2.getDate() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getFullYear() === date2.getFullYear();
    }

    function isDateSelected(date) {
      for (var i = 0; i < selectedDates.length; i++) {
        if (isSameDate(selectedDates[i], date)) {
          return true;
        }
      }
      return false;
    }

    function updateSelectedDatesInput() {
      var formattedDates = selectedDates.map(function(date) {
        return $.datepicker.formatDate('dd/mm/yy', date);
      });
      $("#selected-dates").val(formattedDates.join(', '));
    }
  });


  document.getElementById("btn").addEventListener("click",show);

      function show(e){
        e.preventDefault()
          const xhr = new XMLHttpRequest();
          xhr.responseType="json"
          xhr.open("GET","data.json",true);
          xhr.onreadystatechange=()=>{
              if(xhr.readyState=== 4){
                  if(xhr.status=== 200){
                    var res =xhr.response 
                     var id= document.getElementById("id").value;
                     var sd= document.getElementById("sd").value;
                     var ed= document.getElementById("ed").value;
                     var readed = document.getElementById("selected-dates").value;
                     var lc =document.getElementById("lc").value;
                    
                    res.id=id //ID
                     res.startdate=sd // startdate
                    res.enddate= ed // enddate
                     const month = new Date(res.startdate);
                     const resultmonth = month.getMonth()+1;
                     res.month=resultmonth; // month,year
                     
                     res.readDe =readed //Date-excluded

                   
                     const d1 = new Date(sd);
                     const d2= new Date(ed);
                     const time = Math.abs(d1-d2);
                     const days = Math.ceil(time/(1000*60*60*24))
                     res.noofdays=days //No of Days
                    
                     res.leadcount= parseInt(lc)* parseInt(res.noofdays)// leadcount
                     res.expectedDrr = lc //ExpectedDRR
                     document.getElementById("mytable").innerHTML+= "<tr>"+"<td>"+"NA"+"</td>"+"<td>"+res.id+"</td>"+"<td>"+res.startdate+"</td>"+"<td>"+res.enddate+"</td>"+"<td>"+res.month+"</td>"+"<td>"+res.readDe+"</td>"+"<td>"+res.noofdays+"</td>"+"<td>"+res.leadcount+"</td>"+"<td>"+res.expectedDrr+"</td>"+"<td>"+document.lastModified+"</td>"+"</tr>"
          
                    }else{
                      console.log("Error")
                  }
              }
          }
          xhr.send();
        }
