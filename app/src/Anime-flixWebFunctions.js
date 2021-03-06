function getMALList(manga)
{
    var listType = manga ? 'manga' : 'anime';
    var url = 'http://www.anime-flix.com/requester.php?m=list&t=' + listType;
    var request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password);
    var body = request.responseText;

    malList = XML2jsobj(request.responseXML.documentElement);
    if(malList[listType] == undefined)
    {
        malList[listType] = [];
    }
    if(malList[listType].length == undefined)
    {
        malList[listType] = [malList[listType]];
    }
    return malList;
}

function updateAnime(listData, callBack)
{
    var request = new XMLHttpRequest();
    if(listData.localConstruction == undefined)
    {
        request.open('post', 'http://anime-flix.com/requester.php?m=update&i=' + listData.series_animedb_id);
        request.onreadystatechange = function ()
        {
            if(request.readyState == 4)
            {
                if(request.status == 200)
                {
                    if(callBack)
                    {
                        callBack(request.response);
                    }
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password + '&data=' + (createUpdateBody(listData)));
    }
    else
    {
        request.open('post', 'http://anime-flix.com/requester.php?m=add&i=' + listData.series_animedb_id);
        request.onreadystatechange = function ()
        {
            if(request.readyState == 4)
            {
                if(request.status == 200)
                {
                    if(callBack)
                    {
                        listData.localConstruction=undefined;
                        callBack(request.response);
                    }
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password + '&data=' + (createUpdateBody(listData)));
    }
}
function updateManga(listData, callBack)
{
    var request = new XMLHttpRequest();
    if(listData.localConstruction == undefined)
    {
        request.open('post', 'http://anime-flix.com/requester.php?m=updatem&i=' + listData.series_mangadb_id);
        request.onreadystatechange = function ()
        {
            if(request.readyState == 4)
            {
                if(request.status == 200)
                {
                    if(callBack)
                    {
                        callBack(request.response);
                    }
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password + '&data=' + (createMangaUpdateBody(listData)));
    }
    else
    {
        request.open('post', 'http://anime-flix.com/requester.php?m=addm&i=' + listData.series_mangadb_id);
        request.onreadystatechange = function ()
        {
            if(request.readyState == 4)
            {
                if(request.status == 200)
                {
                    if(callBack)
                    {
                        listData.localConstruction=undefined;
                        callBack(request.response);
                    }
                }
            }
        };
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password + '&data=' + (createMangaUpdateBody(listData)));
    }
}
function deleteListItem(id,type, callBack)
{
    var request = new XMLHttpRequest();
    request.open('post', 'http://anime-flix.com/requester.php?m=delete&i=' + id+'&t='+type);
    request.onreadystatechange = function ()
    {
        if(request.readyState == 4)
        {
            if(request.status == 200)
            {
                if(callBack)
                {
                    callBack(request.response);
                }
            }
        }
    };
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password);
}

function getDiscussionURL(episode, showId)
{
    var request = new XMLHttpRequest();
    request.open('post', 'http://anime-flix.com/requester.php?m=discuss&i=' + showId + '&e=' + episode, false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password);
    return request.response;
}


function createMangaUpdateBody(listData)
{
    /*
    var ret = 'entry_id=' +listData.my_id +
            '&manga_id=' + listData.series_mangadb_id +
            '&anime_db_series_id=' + listData.series_animedb_id +
            '&astatus=' + listData.series_status +
            '&close_on_update=&status=' + listData.my_status + //listData.last_status needs to be added by series display. Using destructive hack right now
            '&chap_read=' + listData.my_read_chapters + //listData.last_completed_eps needs to be added by series display. Using destructive hack right now
            '&score=' + listData.my_score +
            '&submitIt=2';
    //these are unimportant and are not used my me (other and start and end date), these need to be set up to just pass original list data values through
    //'&tags=&fansub_group=0&priority=0&storage=0&storageVal=0.00&list_downloaded_eps=0&list_times_watched=0&list_rewatch_value=0&list_comments=&discuss=1';
    if(listData.my_start_date != '0000-00-00')
    {
        var dateParts = listData.my_start_date.split('-');
        ret += '&startMonth=' + dateParts[1] + '&startDay=' + dateParts[2] + '&startYear=' + dateParts[0];
    }
    else {
        ret += '&unknownStart=1';
    }
    if(listData.my_finish_date != '0000-00-00')
    {
        var dateParts = listData.my_finish_date.split('-');
        ret += '&endMonth=' + dateParts[1] + '&endDay=' + dateParts[2] + '&endYear=' + dateParts[0];
    }
    else
    {
        ret += '&unknownEnd=1';
    }
    */
   var ret='data='+
           '<?xml version="1.0" encoding="UTF-8"?><entry>'+
                    '<chapter>'+listData.my_read_chapters+'</chapter>'+
                    '<volume>'+listData.my_read_volumes+'</volume>'+
                    '<status>'+listData.my_status+'</status>'+
                    '<score>'+listData.my_score+'</score>'+/*
                    '<downloaded_chapters></downloaded_chapters>'+
                    '<times_reread></times_reread>'+
                    '<reread_value></reread_value>'+*/
                    '<date_start>';
                    var split=listData.my_start_date.split('-');
            ret+=split[1]+split[2]+split[0];
            ret+='</date_start>'+
                    '<date_finish>';
                    var split=listData.my_finish_date.split('-');
            ret+=split[1]+split[2]+split[0];
                    ret+='</date_finish>'+/*
                    '<priority></priority>'+
                    '<enable_discussion></enable_discussion>'+
                    '<enable_rereading></enable_rereading>'+
                    '<comments></comments>'+
                    '<scan_group></scan_group>'+
                    '<tags></tags>'+
                    '<retail_volumes></retail_volumes>'+*/
                    '</entry>';
   
    return ret;
}

function createUpdateBody(listData)
{
    /*
    var ret = 'series_id=' + listData.series_animedb_id +
            '&anime_db_series_id=' + listData.series_animedb_id +
            '&series_title=' + listData.series_animedb_id +
            '&aeps=' + listData.series_episodes +
            '&astatus=' + listData.series_status +
            '&close_on_update=&status=' + listData.my_status +
            '&last_status=0' + //listData.last_status needs to be added by series display. Using destructive hack right now
            '&completed_eps=' + listData.my_watched_episodes +
            '&last_completed_eps=0' + //listData.last_completed_eps needs to be added by series display. Using destructive hack right now
            '&score=' + listData.my_score +
            '&submitIt=2';
    //these are unimportant and are not used my me (other and start and end date), these need to be set up to just pass original list data values through
    //'&tags=&fansub_group=0&priority=0&storage=0&storageVal=0.00&list_downloaded_eps=0&list_times_watched=0&list_rewatch_value=0&list_comments=&discuss=1';
    if(listData.my_start_date != '0000-00-00')
    {
        var dateParts = listData.my_start_date.split('-');
        ret += '&startMonth=' + dateParts[1] + '&startDay=' + dateParts[2] + '&startYear=' + dateParts[0];
    }
    else {
        ret += '&unknownStart=1';
    }
    if(listData.my_finish_date != '0000-00-00')
    {
        var dateParts = listData.my_finish_date.split('-');
        ret += '&endMonth=' + dateParts[1] + '&endDay=' + dateParts[2] + '&endYear=' + dateParts[0];
    }
    else
    {
        ret += '&unknownEnd=1';
    }
    */
   var ret='data='+
           '<?xml version="1.0" encoding="UTF-8"?><entry>'+
                    '<episode>'+listData.my_watched_episodes+'</episode>'+
                    '<status>'+listData.my_status+'</status>'+
                    '<score>'+listData.my_score+'</score>'+
                    /*
                    '<downloaded_chapters></downloaded_chapters>'+
                    '<times_reread></times_reread>'+
                    '<reread_value></reread_value>'+
                    */
                    '<date_start>';
                    var split=listData.my_start_date.split('-');
            ret+=split[1]+split[2]+split[0];
            ret+='</date_start>'+
                    '<date_finish>';
                    var split=listData.my_finish_date.split('-');
            ret+=split[1]+split[2]+split[0];
                    ret+='</date_finish>'+/*
                    '<priority></priority>'+
                    '<enable_discussion></enable_discussion>'+
                    '<enable_rereading></enable_rereading>'+
                    '<comments></comments>'+
                    '<scan_group></scan_group>'+
                    '<tags></tags>'+
                    '<retail_volumes></retail_volumes></entry>'+*/
                    '</entry>';
   
   
    return ret;
}
/*
function createMangaAddBody(listData)
{
    return 'entry_id=0 ' + // listData.series_animedb_id +
            '&manga_id=' + listData.series_mangadb_id+// listData.series_animedb_id +
            '&series_title=' + listData.series_animedb_id +
            '&close_on_update=&status=' + listData.my_status +
            //'&vol_read=0'+
            '&chap_read=' + listData.my_read_chapters +
            '&score=' + listData.my_score +
            '&startMonth=00&startDay=00&startYear=0000&submitIt=1';
}

function createAddBody(listData)
{
    return 'series_id=0' + // listData.series_animedb_id +
            '&anime_db_series_id=' + // listData.series_animedb_id +
            '&series_title=' + listData.series_animedb_id +
            '&aeps=' + listData.series_episodes +
            '&astatus=' + listData.series_status +
            '&close_on_update=&status=' + listData.my_status +
            '&last_status=0' + //listData.last_status needs to be added by series display. Using destructive hack right now
            '&completed_eps=' + listData.my_watched_episodes +
            '&last_completed_eps=0' + //listData.last_completed_eps needs to be added by series display. Using destructive hack right now
            '&score=' + listData.my_score +
            '&startMonth=00&startDay=00&startYear=0000&submitIt=1';
    //these are unimportant and are not used my me (other and start and end date), these need to be set up to just pass original list data values through
    //'&tags=&unknownEnd=1&fansub_group=&priority=0&storage=0&storageVal=&list_downloaded_eps=&list_times_watched=&list_rewatch_value=0&list_comments=&discuss=1';
}

function createSeriesXML(listData)
{
    return '<?xml version="1.0" encoding="UTF-8"?>' +
            '<entry>' +
            '<episode>' + listData.my_watched_episodes + '</episode>' +
            '<status>' + listData.my_status + '</status>' +
            '<score>' + listData.my_score + '</score>' +
            '<downloaded_episodes></downloaded_episodes>' +
            '<storage_type></storage_type>' +
            '<storage_value></storage_value>' +
            '<times_rewatched></times_rewatched>' +
            '<rewatch_value</rewatch_value>' +
            '<date_start>' + listData.my_start_date + '</date_start>' +
            '<date_finish>' + listData.my_finish_date + '</date_finish>' +
            '<priority></priority>' +
            '<enable_discussion></enable_discussion>' +
            '<enable_rewatching></enable_rewatching>' +
            '<comments></comments>' +
            '<fansub_group></fansub_group>' +
            '<tags></tags>' +
            '</entry>';
}
*/
/*
 function searchMAL(search)
 {
 var request = new XMLHttpRequest();
 request.open('POST', 'http://www.anime-flix.com/requester.php?m=search&s=' + search, false);
 request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password);
 var parser = new DOMParser();
 var decodedRes = request.response.replace(/&mdash;/g, '-').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&rsquo;/g, '\'');
 var domObj = parser.parseFromString(decodedRes, "text/xml");
 return XML2jsobj(domObj).anime;
 }
 */
function cleanHTMLSpecialChars(s)
{
    return s.replace(/&mdash;/g, '-').replace(/&ldquo;/g, '"')
            .replace(/&rdquo;/g, '"').replace(/&rsquo;/g, '\'').replace(/&auml;/g, 'a').replace(/&Auml;/g, 'A')
            .replace(/&uuml;/g, 'u').replace(/&Uuml;/g, 'U').replace(/&ouml;/g, 'o').replace(/&Ouml;/g, 'O')
            .replace(/&otilde;/g, 'o').replace(/&Otilde;/g, 'O').replace(/&sbquo;/g, ',').replace(/&bdquo;/g, ',,')
            .replace(/&dagger;/g, ' ').replace(/&Dagger;/g, ' ').replace(/&permil;/g, '%0').replace(/&lsaquo;/g, '<')
            .replace(/&rsaquo;/g, '>').replace(/&spades;/g, ' ').replace(/&clubs;/g, ' ').replace(/&hearts;/g, ' ')
            .replace(/&diams;/g, ' ').replace(/&oline;/g, ' ').replace(/&larr;/g, '<-').replace(/&uarr;/g, ' ')
            .replace(/&rarr;/g, '->').replace(/&darr;/g, ' ').replace(/&trade;/g, ' ').replace(/&hearts;/g, ' ')
            .replace(/&pi;/g, ' ').replace(/&egrave;/g, 'e').replace(/&Egrave;/g, 'E').replace(/&eacute;/g, 'e')
            .replace(/&Eacute;/g, 'E');
}
function searchMALAsync(search,type, callback)
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function ()
    {
        if(request.readyState == 4)
        {
            if(request.status == 200)
            {
                parser = new DOMParser();
                var domObj = parser.parseFromString(cleanHTMLSpecialChars(request.response), "text/xml");
                obj = XML2jsobj(domObj);
                obj = obj[type];
                //obj = XML2jsobj(request.responseXML.documentElement);
                callback(obj);
            }
        }
    };
    var blackStarReg=new RegExp(window.chars[1],'g');
    request.open("POST", 'http://www.anime-flix.com/requester.php?m=search&s=' + search.replace(blackStarReg, ' ').replace(new RegExp(window.chars[0],'g'), ' ')+'&t='+type, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('u=' + sessionStorage.username + '&p=' + sessionStorage.password);
}
function getEpisodeCountAsync(ledgerItem, callback)
{
    var url = 'http://www.anime-flix.com/requester.php?m=epCount&t=' + ledgerItem.name;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function ()
    {
        if(request.readyState == 4)
        {
            if(request.status == 200)
            {
                var strings = request.responseText.split(':');
                var arr = [parseInt(strings[0]), parseInt(strings[1])];
                callback(arr);
            }
        }
    }
    request.open('POST', url);
    request.send(ledgerItem.link);
}

function getChapterCountAsync(ledgerItem, callback)
{
    var url = 'http://www.anime-flix.com/requester.php?m=chapCount';
    var request = new XMLHttpRequest();
    request.onreadystatechange = function ()
    {
        if(request.readyState == 4)
        {
            if(request.status == 200)
            {
                callback(parseInt(request.responseText));
            }
        }
    }
    request.open('POST', url);
    request.send(ledgerItem.link);
}

function getPages(ledgerItem, chapter, callback)
{
    var url = 'http://www.anime-flix.com/requester.php?m=pages&ch=' + chapter;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function ()
    {
        if(request.readyState == 4)
        {
            if(request.status == 200)
            {
                var strings = request.responseText.split(',');
                strings.pop();
                callback(strings);
            }
        }
    }
    request.open('POST', url);
    request.send(ledgerItem.link);
}