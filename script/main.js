$(function() {
    // Date Format
    var dateFormat = 'DD/MM/YYYY';
    // Date Range Picker Options
    var options = {
        autoUpdateInput: false,
        autoApply: true, // Hiding apply and cancel buttons
        minDate: new Date(),
        locale: {
            format: dateFormat
        },
        opens: "down"
    };
    
    // Setting initial Values for inputs
    $("input[name='start_date']").val(moment().format('DD/MM/YYYY'));
    $("input[name='end_date']").val(moment().format('DD/MM/YYYY'));
    
    // Catching Date Range Picker Events...
    $('[data-datepicker=separateRange]')
        .daterangepicker(options)
        .on('apply.daterangepicker' ,function(ev, picker) { // Apply Event

            var boolStart = this.name.match(/start_/g) == null ? false : true;
            var boolEnd = this.name.match(/end_/g) == null ? false : true;

            var mainName = this.name.replace('start_', '');
            if(boolEnd) {
                mainName = this.name.replace('end_', '');
                $(this).closest('form').find('[name=end_'+ mainName +']').blur();
            }

            $(this).closest('form').find('[name=start_'+ mainName +']').val(picker.startDate.format(dateFormat));
            $(this).closest('form').find('[name=end_'+ mainName +']').val(picker.endDate.format(dateFormat));

            $(this).trigger('change').trigger('keyup');
        })
        .on('show.daterangepicker', function(ev, picker) { // Show Event
            var boolStart = this.name.match(/start_/g) == null ? false : true;
            var boolEnd = this.name.match(/end_/g) == null ? false : true;
            var mainName = this.name.replace('start_', '');
            if(boolEnd) {
                mainName = this.name.replace('end_', '');
            }

            var startDate = $(this).closest('form').find('[name=start_'+ mainName +']').val();
            var endDate = $(this).closest('form').find('[name=end_'+ mainName +']').val();

            $('[name=daterangepicker_start]').val(startDate).trigger('change').trigger('keyup');
            $('[name=daterangepicker_end]').val(endDate).trigger('change').trigger('keyup');
            
            if(boolEnd) {
                $('[name=daterangepicker_end]').focus();
            }
        });
});