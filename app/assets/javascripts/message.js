$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
        `<div class="main-chat__message-list__box">
            <div class="main-chat__message-list__box__user">
              <div class="main-chat__message-list__box__user-name">
                ${message.user_name}
              </div>
              <div class="main-chat__message-list__box__user__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main-chat__message-list__box__message">
              <p class="main-chat__message-list__box__message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
        `<div class="main-chat__message-list__box">
            <div class="main-chat__message-list__box__user">
              <div class="main-chat__message-list__box__user-name">
                ${message.user_name}
              </div>
              <div class="main-chat__message-list__box__user__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main-chat__message-list__box__message">
              <p class="main-chat__message-list__box__message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,  
        type: "POST",  
        data: formData,  
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-chat__message-list').append(html);
        $('form')[0].reset();
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
      .always(function() {
        $('.form__submit').removeAttr('disabled');
      })
  }); 
});