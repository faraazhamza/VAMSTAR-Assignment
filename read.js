$(document).ready(function() {
        //https://ffcors.herokuapp.com/
        var rr = []
        var r = $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020",
            type: "GET",
            success: function(data) {
                //console.log(data)
                //  $('[lang="es"]').hide();
                //var item2 = $($(data).find('div.views-element-container')).html();
                var item = $($($($(data).find('div.content-main')).find('div.block-views')).find('.item')).find('span.field-content')[1]
                var Publish = $(item).find("span.lbl-licitacao")[0].innerText
                var Object = $(item).find("span.lbl-licitacao")[1].innerText
                var Objectpara = $(item).find("p")[0].innerText
                var Bidding = $(item).find("span.lbl-licitacao")[5].innerText
                var links = $($($($($(data).find('div.content-main')).find('div.block-views')).find('.item')).find('tbody')).find('td')
                var titlelink = links[0].childNodes[0].innerText
                var linklink = $(links[1].childNodes[0].childNodes[0].childNodes[1]).find('a')[0].attributes[0].nodeValue
                var linkdate = links[3].childNodes[0].innerText
                let arr = [Publish, Object, Objectpara, Bidding, titlelink, linklink, linkdate]

            
                for (var i = 0; i < 7; i++) {
                    if (i == 5) {
                        continue
                    }

                    function googlecall() {
                        const settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
                            "method": "POST",
                            "headers": {
                                "content-type": "application/x-www-form-urlencoded",
                                "accept-encoding": "application/gzip",
                                "x-rapidapi-key": "f628b7926bmsh217410281a46eabp16d4aajsn0efe8f59f3cd",
                                "x-rapidapi-host": "google-translate1.p.rapidapi.com"
                            },
                            "data": {
                                "q": arr[i],
                                "source": "pt-br",
                                "target": "en"
                            }
                        };
                        //hfaza682
                        $.ajax(settings).done(function(response) {
                            rr[i] = response['data']['translations'][0]['translatedText'].toString()
                            
                            console.log(rr[i])
                            if (i == 0) {
                                var p = document.getElementsByClassName('publication')
                                $(p).text(rr[i])
                            } else if (i == 1) {
                                var p = document.getElementsByClassName('obpara')
                                $(p).text(rr[i])
                            } else if (i == 2) {
                                var p = document.getElementsByClassName('bid')
                                $(p).text(rr[i])
                            } else if (i == 3) {
                                var p = document.getElementsByClassName('object')
                                $(p).text(rr[i])
                            } else if (i == 4) {
                                var p = document.getElementsByClassName('lin')
                                $(p).text("Title " + rr[i] + "  Link  " + linklink + " Date " + linkdate)
                            }
                        });

                    }
                    setInterval(10000000, googlecall());

                }
            }
        })


    })
