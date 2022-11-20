/*
    
    idResolver.js
    Harrison L. (@Stratiz)
    Created on 11/19/2022 @ 18:08:16
    
    Description:
        Resolves a universe id from a place id.
    
    Documentation:
        <void> getId(req, res) - Resolves a universe id from a place id.
*/ 
import fetch, { Headers } from "node-fetch";

const MAX_CACHE_SIZE = 700;

let idCache = {};
let cacheSize = 0;

export function getId (req, res) {
    let placeIds = req.query.placeIds
    if (typeof placeIds == "string") {
        placeIds = [placeIds];
    }
    let queryString = "?";
    if (placeIds) {
        let currentIndex = 0;
        for (let placeId of placeIds) {
            if (!idCache[placeId.toString()]) {
                queryString = queryString + "placeIds=" + placeId;
                if (currentIndex < placeIds.length - 1) {
                    queryString = queryString + "&";
                }
                currentIndex += 1;
            }
        }
    } else {
        res.status(400).send("Missing placeIds query parameter(s)");
        return;
    }
    
    // fetch univserse ids
    if (queryString != "?") {
        const fetchHeaders = new Headers();
        fetchHeaders.append("Cookie", ".ROBLOSECURITY=" + process.env.COOKIE);
        fetch("https://games.roblox.com/v1/games/multiget-place-details" + queryString, { method: "GET", credentials: "include", headers: fetchHeaders })
            .then(rblxRes => rblxRes.json())
            .then(json => {
                if (json.errors) {
                    res.status(500).send("Roblox response: " + json.errors[0].message);
                } else {
                    let universeIds = [];
                    for (let placeId of placeIds) {
                        if (idCache[placeId.toString()]) {
                            universeIds.push(idCache[placeId.toString()]);
                        } else {
                            let result = json.find(result => result.placeId == placeId);
                            if (result != undefined) {
                                universeIds.push(result.universeId);
                                idCache[placeId.toString()] = result.universeId;
                                
                                if (cacheSize > MAX_CACHE_SIZE) {
                                    let keys = Object.keys(idCache);
                                    delete idCache[keys[0]];
                                } else {
                                    cacheSize += 1;
                                }
                            } else {
                                universeIds.push(0);
                            }
                        }
                    }
                    res.status(200).json(universeIds);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    } else {
        let universeIds = [];
        for (let placeId of placeIds) {
            universeIds.push(idCache[placeId.toString()]);
        }
        res.status(200).json(universeIds);
    }
}
