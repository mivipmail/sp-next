import React, {useEffect, useState} from "react";
import loadingImg from "../public/images/loading@2x.gif";
import {AddressType} from "../consts/types";


const useMap = () => {

    useEffect(() => {
        // @ts-ignore
        if (typeof ymaps === 'undefined') {
            let newScript = document.createElement("script");
            newScript.type = 'text/javascript';
            newScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=61021511-8326-4488-98ff-5bbffaed897e&lang=ru_RU';
            document.getElementsByTagName('head')[0].appendChild(newScript);
        }
    }, [])

    const jsxElement = (
        <div id="map" className="map text-center">
            <img src={loadingImg.src} alt="Загрузка..." className="d-inline-block m-5 p-5"/>
        </div>
    )

    const init = (addresses: AddressType[], city: string|null, showBtn: boolean = false): void => {
        let mapEl = document.getElementById('map')
        if(mapEl)
            mapEl.innerHTML = ""

        // @ts-ignore
        if (typeof ymaps === 'undefined' || typeof ymaps.geocode !== 'function') {
            setTimeout(() => init(addresses, city, showBtn), 250)
            return
        }

        let geoCity = city
        const pvz = addresses

        //let geoCity = 'Самара'
        if (geoCity === 'Армавир')
            geoCity = 'Армавир, Краснодарский край';
        // @ts-ignore
        let myGeocoder = ymaps.geocode(geoCity);

        myGeocoder.then(
            function (res: any) {
                let gps1 = res.geoObjects.get(0).geometry._coordinates[0];
                let gps2 = res.geoObjects.get(0).geometry._coordinates[1];

                // @ts-ignore
                let myMap = new ymaps.Map('map', {
                    center: [gps1, gps2],
                    zoom: 11
                }, {
                    searchControlProvider: 'yandex#search'
                })

                // @ts-ignore
                let clusterer = new ymaps.Clusterer({
                    preset: 'islands#greenClusterIcons',
                    clusterHideIconOnBalloonOpen: false,
                    geoObjectHideIconOnBalloonOpen: false
                })

                clusterer.events
                    // Можно слушать сразу несколько событий, указывая их имена в массиве.
                    .add(['mouseenter', 'mouseleave'], function (e: any) {
                        let target = e.get('target'),
                            type = e.get('type');
                        if (typeof target.getGeoObjects != 'undefined') {
                            // Событие произошло на кластере.
                            if (type === 'mouseenter') {
                                target.options.set('preset', 'islands#darkGreenClusterIcons');
                            } else {
                                target.options.set('preset', 'islands#greenClusterIcons');
                            }
                        } else {
                            // Событие произошло на геообъекте.
                            if (type === 'mouseenter') {
                                target.options.set('preset', 'islands#darkGreenDotIcon');
                            } else {
                                target.options.set('preset', 'islands#greenDotIcon');
                            }
                        }
                    });

                let geoObjects = [];
                for (let i = pvz.length - 1; i >= 0; i--) {
                    // @ts-ignore
                    geoObjects[i] = new ymaps.Placemark(
                        [pvz[i].coord_y, pvz[i].coord_x],
                        {
                            balloonContentBody: `<div style="max-width: 320px">
                                <h5>${pvz[i].parcel_shop_name}</h5>
                                <hr class="my-1"/>
                                <p class="mb-1">${pvz[i].city + ', ' + pvz[i].address}</p>
                                <p class="mb-2" style="font-size: 1.4rem; color: gray">
                                    <i class="fa fa-money pr-1"></i>
                                    ${pvz[i].card ? `<i class="fa fa-credit-card"></i>` : null}
                                </p>
                                <p class="mb-2"
                                   style="font-size: 0.8rem; line-height: 0.9rem;">${pvz[i].address_comment}</p>
                                ${pvz[i].work_time ? `<p>${pvz[i].work_time}</p>` : null}
                                ${showBtn ? `<button type="button"
                                                   id="${pvz[i].parcel_shop_code}"
                                                   title="Выбрать ПВЗ"
                                                   class="pvz btn amado-btn btn-sm float-right">Выбрать</button>`
                                : ``
                            }
                            </div>`,
                            clusterCaption: null
                        },
                        {
                            preset: 'islands#greenDotIcon'
                        }
                    )


                }

                clusterer.add(geoObjects);
                myMap.geoObjects.add(clusterer);
            },
            // @ts-ignore
            function (err) {
                // Обработка ошибки.
            }
        );

    }

    return {
        init,
        jsxElement,
    }
}

export default useMap