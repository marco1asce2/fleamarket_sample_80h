$(function(){
  // プレビュー用のボックスを生成するための関数
  const buildImg = (index, url)=> {
    const html = `<div data-index="${index}", class="products_new-preview-box">
                    <div class="products_new-upper-box">
                      <img data-index="${index}" src="${url}" width="100px" height="100px">
                      <div class="products_new-js-remove">
                      削除
                    </div>
                  </div>
                </div>`;
    return html;
  }
  // プレビュー用imgタグを生成するための関数
  const buildFileField = (num)=> {
    const html = `<div data-index="${num}" class="items_new-js-file_group">
                    <input class="items_new-js-file" type="file"
                    name="item[item_images_attributes][${num}][image]"
                    id="item_images_attributes_${num}_image"
                    style= "display:none;">
                  </div>`;
    return html;
  }
  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  lastIndex = $('.items_new-js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);
  $('.products_new-hidden-destroy').hide();

  $('.items_new-image-box').on('change', '.items_new-js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    $('.items_new-content').append(buildImg(targetIndex, blobUrl));
    // fileIndexの先頭の数字を使ってinputを作る
    $('.items_new-uploader__label').prepend(buildFileField(fileIndex[0]));
    $(this).css({'display':'none'});
    fileIndex.shift();
    // 末尾の数に1足した数を追加する
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
  });

  $('.items_new-image-box').on('click', '.products_new-js-remove', function() {
    const targetIndex = $(this).prev().data('index');
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].products_new-hidden-destroy`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    // 削除ボタンを取得
    $(this).parent().parent().remove();
    $(`div[data-index="${targetIndex}"]`).remove();
    if ($('.items_new-js-file').length == 0) $('.items_new-image-box').append(buildFileField(fileIndex[0]));
  });
});