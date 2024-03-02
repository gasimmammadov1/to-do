$(document).ready(function() {
  $('.task-form').submit(function(event) {
    event.preventDefault();

    const task = $('.task-form input[name="task"]').val();

    if (task.trim() === '') {
      $('.alert--error').show();
      return;
    }

    $('.alert--error').hide();

    $.ajax({
      url: '/',
      type: 'POST',
      data: { task: task },
      success: function(response) {
        $('.alert--success').show().delay(2000).fadeOut();

        if (response.tasks.length === 1) {
          $('.no-tasks').hide();
          $('.list').empty();
        }

        const listItem = $('<li class="list__item"></li>');
        const checkbox = $('<div class="checkbox"></div>');
        const taskText = $('<span class="list__item-text"></span>').text(task);
        listItem.append(checkbox).append(taskText);
        $('.list').append(listItem);
      },
      error: function() {
        alert('An unexpected error occurred!');
      }
    });

    $('.task-form input[name="task"]').val('');
  });

  $(document).on('click', '.checkbox', function() {
    $(this).addClass('checkbox--checked');
    $(this).html(`
      <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <polygon id="icon" fill="white" points="7.13636364 11.9104478 4.03409091 8.7761194 3 9.82089552 7.13636364 14 16 5.04477612 14.9659091 4"></polygon>
        </g>
      </svg>`
    );

    const task = $(this).next('.list__item-text').text();

    $.ajax({
      url: '/done',
      type: 'POST',
      data: { task: task },
      success: function() {
        $(this).parent().remove();
      },
      error: function() {
        alert('An unexpected error occurred!');
      }
    });
  });
});
