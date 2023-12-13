FROM golang:1.20.4-alpine3.17 AS builder

WORKDIR /usr/local/go/src/


ADD . /usr/local/go/src/

RUN go clean --modcache && \
    go build -mod=mod -o app cmd/analytic/main.go


FROM alpine:3.17

COPY --from=builder /usr/local/go/src/ /

CMD ["/app"]

