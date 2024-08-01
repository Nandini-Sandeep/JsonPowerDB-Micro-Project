$(document).ready(function() {
    // Disable all fields except rollNo
    disableFields(true);
    $('#rollNo').prop('disabled', false);
    
    $('#rollNo').on('blur', function() {
        let rollNo = $('#rollNo').val();
        if (rollNo) {
            checkRollNo(rollNo);
        }
    });

    $('#saveBtn').click(function() {
        if (validateForm()) {
            saveStudent();
        }
    });

    $('#updateBtn').click(function() {
        if (validateForm()) {
            updateStudent();
        }
    });

    $('#resetBtn').click(function() {
        resetForm();
    });

    function disableFields(disable) {
        $('#fullName, #class, #birthDate, #address, #enrollmentDate').prop('disabled', disable);
        $('#saveBtn, #updateBtn').prop('disabled', disable);
    }

    function checkRollNo(rollNo) {
        // Check if Roll No exists in the database
        $.ajax({
            url: 'YOUR_JSON_POWER_DB_URL',
            method: 'POST',
            data: JSON.stringify({
                "rollNo": rollNo,
                // add your authentication here
            }),
            success: function(response) {
                if (response.data.length > 0) {
                    // Roll No exists, populate form
                    let student = response.data[0];
                    $('#fullName').val(student.fullName);
                    $('#class').val(student.class);
                    $('#birthDate').val(student.birthDate);
                    $('#address').val(student.address);
                    $('#enrollmentDate').val(student.enrollmentDate);

                    disableFields(false);
                    $('#saveBtn').prop('disabled', true);
                    $('#updateBtn').prop('disabled', false);
                    $('#rollNo').prop('disabled', true);
                } else {
                    // Roll No does not exist
                    disableFields(false);
                    $('#saveBtn').prop('disabled', false);
                    $('#updateBtn').prop('disabled', true);
                }
            },
            error: function(error) {
                alert('Error: ' + error.message);
            }
        });
    }

    function validateForm() {
        let isValid = true;
        $('input').each(function() {
            if ($(this).val() === '' && $(this).prop('disabled') === false) {
                isValid = false;
            }
        });
        return isValid;
    }

    function saveStudent() {
        let studentData = {
            rollNo: $('#rollNo').val(),
            fullName: $('#fullName').val(),
            class: $('#class').val(),
            birthDate: $('#birthDate').val(),
            address: $('#address').val(),
            enrollmentDate: $('#enrollmentDate').val()
        };

        $.ajax({
            url: 'YOUR_JSON_POWER_DB_URL',
            method: 'POST',
            data: JSON.stringify(studentData),
            success: function(response) {
                alert('Student saved successfully!');
                resetForm();
            },
            error: function(error) {
                alert('Error: ' + error.message);
            }
        });
    }

    function updateStudent() {
        let studentData = {
            rollNo: $('#rollNo').val(),
            fullName: $('#fullName').val(),
            class: $('#class').val(),
            birthDate: $('#birthDate').val(),
            address: $('#address').val(),
            enrollmentDate: $('#enrollmentDate').val()
        };

        $.ajax({
            url: 'YOUR_JSON_POWER_DB_URL',
            method: 'PUT',
            data: JSON.stringify(studentData),
            success: function(response) {
                alert('Student updated successfully!');
                resetForm();
            },
            error: function(error) {
                alert('Error: ' + error.message);
            }
        });
    }

    function resetForm() {
        $('#studentForm')[0].reset();
        disableFields(true);
        $('#rollNo').prop('disabled', false).focus();
    }
});
