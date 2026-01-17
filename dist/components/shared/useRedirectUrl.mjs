var e=()=>{let r=new URL(location.href);return r.searchParams.get("redirectUrl")&&r.searchParams.delete("redirectUrl"),r.href};export{e as useRedirectUrl};
