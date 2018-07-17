$(function () {
    var $postWrapper = $('.post-wrapper'),
        $postFormTitle = $postWrapper.find('.js-post-title'),
        $postFormSummary = $postWrapper.find('.js-post-summary'),
        $postFormAuthor = $postWrapper.find('.js-post-author'),
        $savePost = $postWrapper.find('.js-save-post'),

        $postsWrapper = $('.posts-wrapper'),
        $post = $postsWrapper.find('.post'),

        postData = JSON.parse(localStorage.posts) || [],
        activePostData = postData[window.location.hash.replace('#', '' )-1] || {};

    // Build posts from localStorage
    (function () {
        $post.remove();

        postData.forEach(function (val, index) {
            var $tempPost = $post.clone(true),
                $postTitle = $tempPost.find('.js-post-title'),
                $postSummary = $tempPost.find('.js-post-summary'),
                postAuthor = $tempPost.find('.js-post-author'),
                $postDate = $tempPost.find('.js-post-date'),
                $postLikesBlock = $tempPost.find('.js-likes-block'),
                $postLikeCount = $tempPost.find('.js-post-like-count');

            if (val['like-count'] < 1) $postLikesBlock.addClass('hide');

            $tempPost.attr('data-post-id', index+1);

            $postTitle.replaceWith($postTitle.html(val.title || ''));
            $postSummary.replaceWith($postSummary.html(val.summary || ''));
            postAuthor.replaceWith(postAuthor.html(val.author || ''));
            $postDate.replaceWith($postDate.html(val.date) || '');
            $postLikeCount.replaceWith($postLikeCount.html(val['like-count'] || ''));

            $tempPost.appendTo($postsWrapper)
        });
    })();

    $postFormTitle.val(activePostData.title || '');
    $postFormSummary.val(activePostData.summary || '');
    $postFormAuthor.val(activePostData.author || '');

    $savePost.on('click', function () {
        var date = new Date().getDate() + ' ' + new Date().toLocaleString('en-us', { month: "short" });

        if($.isEmptyObject( activePostData )){
            postData.push({
                title: $postFormTitle.val(),
                summary: $postFormSummary.val(),
                author: $postFormAuthor.val(),
                date: date,
                'like-count': 0
                });
        } else {
            postData[window.location.hash.replace('#', '' )-1] = {
                title: $postFormTitle.val(),
                summary: $postFormSummary.val(),
                author: $postFormAuthor.val(),
                date: date,
                'like-count': activePostData['like-count']
            }
        }

        localStorage.posts = JSON.stringify(postData);

        window.location = '/';
    })
});
