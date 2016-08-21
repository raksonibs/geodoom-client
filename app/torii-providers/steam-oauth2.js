import Oauth2 from 'torii/providers/oauth2-code';
import {configurable} from 'torii/configuration';

var SteamOauth2 = Oauth2.extend({
  // https://k-v1.herokuapp.com/auth/connect?t=Fx6yx4kaYFWUPmvRsiB_&s=steam
  // https://steamcommunity.com/openid/login?openid.ax.if_available=ext4%2Cext5%2Cext6%2Cext7%2Cext8&openid.ax.mode=fetch_request&openid.ax.required=ext0%2Cext1%2Cext2%2Cext3&openid.ax.type.ext0=http%3A%2F%2Faxschema.org%2Fcontact%2Femail&openid.ax.type.ext1=http%3A%2F%2Faxschema.org%2FnamePerson&openid.ax.type.ext2=http%3A%2F%2Faxschema.org%2FnamePerson%2Ffirst&openid.ax.type.ext3=http%3A%2F%2Faxschema.org%2FnamePerson%2Flast&openid.ax.type.ext4=http%3A%2F%2Faxschema.org%2FnamePerson%2Ffriendly&openid.ax.type.ext5=http%3A%2F%2Faxschema.org%2Fcontact%2Fcity%2Fhome&openid.ax.type.ext6=http%3A%2F%2Faxschema.org%2Fcontact%2Fstate%2Fhome&openid.ax.type.ext7=http%3A%2F%2Faxschema.org%2Fcontact%2Fweb%2Fdefault&openid.ax.type.ext8=http%3A%2F%2Faxschema.org%2Fmedia%2Fimage%2Faspect11&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.ax=http%3A%2F%2Fopenid.net%2Fsrv%2Fax%2F1.0&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.realm=https%3A%2F%2Fk-v1.herokuapp.com&openid.return_to=https%3A%2F%2Fk-v1.herokuapp.com%2Fauth%2Fsteam%2Fcallback%3F_method%3Dpost&openid.sreg.optional=postcode%2Cnickname&openid.sreg.required=email%2Cfullname
  name:    'steam-oauth2',
  baseUrl: 'http://steamcommunity.com/openid/login?openid/',

  // additional params that this provider requires
  optionalUrlParams: ['scope', 'request_visible_actions', 'access_type', 'approval_prompt', 'hd'],

  requestVisibleActions: configurable('requestVisibleActions', ''),

  accessType: configurable('accessType', ''),

  responseParams: ['code', 'state'],

  scope: configurable('scope', 'email'),

  approvalPrompt: configurable('approvalPrompt', 'auto'),

  redirectUri: configurable('redirectUri',
                            'http://localhost:8000/oauth2callback'),

  hd: configurable('hd', '')
});

export default SteamOauth2;