def process_event_notification(http_raw_request_body, http_headers)
  digest = OpenSSL::Digest.new("sha1")
  computed_signature = OpenSSL::HMAC.hexdigest(digest, "secret", http_raw_request_body)
  puts computed_signature
  marqeta_signature = http_headers.get_fields("X-Marqeta-Signature")
  if marqeta_signature == computed_signature
    # Verified request.
    request_body_hash = http_raw_request_body.to_hash
    ping_body = request_body_hash[:pings][0]
    if ping_body.token == "marqeta" && ping_body.payload = "healthcheck"
      response.status_code = 200
      response
    else
      # Insert code that checks for event notifications.
    end
  else
    # Unverified request. Insert code that responds appropriately.
  end
end

digest = OpenSSL::Digest.new("sha1")
computed_signature = OpenSSL::HMAC.hexdigest(digest, "secret", 'asdf')
puts computed_signature


