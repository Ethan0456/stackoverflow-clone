<table id='table'>
<script>
    $(document).ready(function () {

        // FETCHING DATA FROM JSON FILE
        $.getJSON("json", 
                function (data) {
            var user = '';

            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                user += '<tr>';
                user += '<td>' + 
                    key.title + '</td>';

                user += '<td>' + 
                    key.content + '</td>';

                user += '<td>' + 
                    key.asker+ '</td>';

                user += '<td>' + 
                    key.votes + '</td>';

                user += '</tr>';
            });
              
            //INSERTING ROWS INTO TABLE 
            $('#table').append(student);
        });
    });
</script>
</table>