/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

import * as $_____lib_oop from '../lib/oop'
import * as $_____lib_lang from '../lib/lang'
import * as $____html from './html'
import * as $____coldfusion_highlight_rules from './coldfusion_highlight_rules'

var oop = $_____lib_oop
var lang = $_____lib_lang
var HtmlMode = $____html.Mode
var ColdfusionHighlightRules =
  $____coldfusion_highlight_rules.ColdfusionHighlightRules

var voidElements = 'cfabort|cfapplication|cfargument|cfassociate|cfbreak|cfcache|cfcollection|cfcookie|cfdbinfo|cfdirectory|cfdump|cfelse|cfelseif|cferror|cfexchangecalendar|cfexchangeconnection|cfexchangecontact|cfexchangefilter|cfexchangetask|cfexit|cffeed|cffile|cfflush|cfftp|cfheader|cfhtmlhead|cfhttpparam|cfimage|cfimport|cfinclude|cfindex|cfinsert|cfinvokeargument|cflocation|cflog|cfmailparam|cfNTauthenticate|cfobject|cfobjectcache|cfparam|cfpdfformparam|cfprint|cfprocparam|cfprocresult|cfproperty|cfqueryparam|cfregistry|cfreportparam|cfrethrow|cfreturn|cfschedule|cfsearch|cfset|cfsetting|cfthrow|cfzipparam)'.split(
  '|'
)

export var Mode = function() {
  HtmlMode.call(this)

  this.HighlightRules = ColdfusionHighlightRules
}
oop.inherits(Mode, HtmlMode)
;(function() {
  // mix with html void elements
  this.voidElements = oop.mixin(
    lang.arrayToMap(voidElements),
    this.voidElements
  )

  this.getNextLineIndent = function(state, line, tab) {
    return this.$getIndent(line)
  }

  this.$id = 'ace/mode/coldfusion'
}.call(Mode.prototype))